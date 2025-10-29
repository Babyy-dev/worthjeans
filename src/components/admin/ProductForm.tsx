import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const productSchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100),
  description: z.string().optional(),
  price: z.string().min(1, "Price is required"),
  original_price: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
  images: z.array(z.string().url()).optional(),
  stock: z.string().min(0),
  is_featured: z.boolean(),
  is_active: z.boolean(),
});

type ProductFormData = z.infer<typeof productSchema>;

interface ProductFormProps {
  product: any;
  onClose: () => void;
}

export const ProductForm = ({ product, onClose }: ProductFormProps) => {
  const [additionalImages, setAdditionalImages] = useState<string[]>(product?.images || []);
  const [newImageUrl, setNewImageUrl] = useState("");
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  const form = useForm<ProductFormData>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: product?.name || "",
      slug: product?.slug || "",
      description: product?.description || "",
      price: product?.price?.toString() || "",
      original_price: product?.original_price?.toString() || "",
      image_url: product?.image_url || "",
      images: product?.images || [],
      stock: product?.stock?.toString() || "0",
      is_featured: product?.is_featured || false,
      is_active: product?.is_active || true,
    },
  });

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const { url } = await api.upload('/upload', file);
      return url as string;
    } catch (error) {
      console.error("Error uploading image:", error);
      toast({
        title: "Upload failed",
        description: "Failed to upload image",
        variant: "destructive",
      });
      return null;
    }
  };

  const handleMainImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);

    if (url) {
      form.setValue("image_url", url);
    }
  };

  const handleAdditionalImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);

    if (url) {
      setAdditionalImages([...additionalImages, url]);
    }
  };

  const addImage = () => {
    if (newImageUrl && newImageUrl.trim()) {
      setAdditionalImages([...additionalImages, newImageUrl.trim()]);
      setNewImageUrl("");
    }
  };

  const removeImage = (index: number) => {
    setAdditionalImages(additionalImages.filter((_, i) => i !== index));
  };

  const onSubmit = async (data: ProductFormData) => {
    const productData = {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      price: parseFloat(data.price),
      original_price: data.original_price ? parseFloat(data.original_price) : null,
      stock: parseInt(data.stock),
      image_url: data.image_url || null,
      images: additionalImages.length > 0 ? additionalImages : null,
      is_featured: data.is_featured,
      is_active: data.is_active,
    };

    try {
      if (product) {
        await api.put(`/products/${product.id}`, productData);
      } else {
        await api.post('/products', productData);
      }
      toast({ title: "Success", description: `Product ${product ? "updated" : "created"} successfully` });
      onClose();
    } catch (e: any) {
      toast({ title: "Error saving product", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{product ? "Edit Product" : "Add New Product"}</CardTitle>
        <Button variant="ghost" size="sm" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter product name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Slug</FormLabel>
                    <FormControl>
                      <Input placeholder="product-slug" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="original_price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Original Price (₹)</FormLabel>
                    <FormControl>
                      <Input type="number" step="0.01" placeholder="0.00" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="0" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

              <FormField
                control={form.control}
                name="image_url"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Main Product Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploading}
                            onClick={() => document.getElementById("main-image-upload")?.click()}
                          >
                            {uploading ? (
                              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
                            ) : (
                              <><Upload className="h-4 w-4 mr-2" /> Upload Image</>
                            )}
                          </Button>
                          <input
                            id="main-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleMainImageUpload}
                          />
                        </div>
                        {field.value && (
                          <div className="relative w-32 h-32 border rounded">
                            <img
                              src={field.value}
                              alt="Main product"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

            <div className="space-y-4">
              <div>
                <FormLabel>Additional Product Images</FormLabel>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant="outline"
                    disabled={uploading}
                    onClick={() => document.getElementById("additional-image-upload")?.click()}
                  >
                    {uploading ? (
                      <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
                    ) : (
                      <><Upload className="h-4 w-4 mr-2" /> Add Image</>
                    )}
                  </Button>
                  <input
                    id="additional-image-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleAdditionalImageUpload}
                  />
                </div>
              </div>
              
              {additionalImages.length > 0 && (
                <div className="flex flex-wrap gap-2 mt-2">
                  {additionalImages.map((url, index) => (
                    <div key={index} className="relative group">
                      <img src={url} alt={`Product ${index + 1}`} className="w-20 h-20 object-cover rounded border" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => removeImage(index)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Product description" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-6">
              <FormField
                control={form.control}
                name="is_active"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Active</FormLabel>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="is_featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-2">
                    <FormControl>
                      <Switch checked={field.value} onCheckedChange={field.onChange} />
                    </FormControl>
                    <FormLabel className="!mt-0">Featured</FormLabel>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {product ? "Update Product" : "Create Product"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

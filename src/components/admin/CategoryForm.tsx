import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { X, Upload, Loader2 } from "lucide-react";
import { api } from "@/lib/api";

const categorySchema = z.object({
  name: z.string().min(1, "Name is required").max(100),
  slug: z.string().min(1, "Slug is required").max(100),
  description: z.string().optional(),
  image_url: z.string().url().optional().or(z.literal("")),
});

type CategoryFormData = z.infer<typeof categorySchema>;

interface CategoryFormProps {
  category: any;
  onClose: () => void;
}

export const CategoryForm = ({ category, onClose }: CategoryFormProps) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);

  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: category?.name || "",
      slug: category?.slug || "",
      description: category?.description || "",
      image_url: category?.image_url || "",
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

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const url = await uploadImage(file);
    setUploading(false);

    if (url) {
      form.setValue("image_url", url);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    const categoryData = {
      name: data.name,
      slug: data.slug,
      description: data.description || null,
      image_url: data.image_url || null,
    };

    try {
      if (category) {
        await api.put(`/categories/${category.id}`, categoryData);
      } else {
        await api.post('/categories', categoryData);
      }
      toast({ title: "Success", description: `Category ${category ? "updated" : "created"} successfully` });
      onClose();
    } catch (e: any) {
      toast({ title: "Error saving category", description: e.message, variant: "destructive" });
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>{category ? "Edit Category" : "Add New Category"}</CardTitle>
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
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter category name" {...field} />
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
                      <Input placeholder="category-slug" {...field} />
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
                    <FormLabel>Category Image</FormLabel>
                    <FormControl>
                      <div className="space-y-4">
                        <div className="flex items-center gap-4">
                          <Button
                            type="button"
                            variant="outline"
                            disabled={uploading}
                            onClick={() => document.getElementById("category-image-upload")?.click()}
                          >
                            {uploading ? (
                              <><Loader2 className="h-4 w-4 mr-2 animate-spin" /> Uploading...</>
                            ) : (
                              <><Upload className="h-4 w-4 mr-2" /> Upload Image</>
                            )}
                          </Button>
                          <input
                            id="category-image-upload"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                          />
                        </div>
                        {field.value && (
                          <div className="relative w-32 h-32 border rounded">
                            <img
                              src={field.value}
                              alt="Category"
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

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Category description" rows={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="flex gap-4 justify-end">
              <Button type="button" variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                {category ? "Update Category" : "Create Category"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

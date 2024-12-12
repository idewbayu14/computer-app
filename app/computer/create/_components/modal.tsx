"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import toast from "react-hot-toast";
import { ImageUpload } from "@/app/computer/components/upload-image";

const formSchema = z.object({
  nama_produk: z.string().min(2, {
    message: "Nama produk harus diisi",
  }).max(50),
  kategori: z.string().min(2, {
    message: "Kategori harus diisi",
  }).max(50),
  harga: z.coerce.number(),
  stok: z.coerce.number(),
  gambar_produk: z.string(),
});

export const Create = () => {
  const router = useRouter();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nama_produk: "",
      kategori: "",
      harga: 0,
      stok: 0,
      gambar_produk: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      toast.success("computer created");
      await axios.post(`/api/computer`, values);

      router.push("/computer");
      router.refresh();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-96 p-6 bg-white rounded-xl shadow-2xl">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">CREATE PRODUK</h2>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="nama_produk"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Nama Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Nama Produk"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="kategori"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Kategori Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Komponen Komputer atau Aksesoris"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="harga"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Harga Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Harga"
                    type="number"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="stok"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg text-gray-700">Stok Produk</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Masukkan Stok Produk"
                    type="number"
                    className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-sm text-red-500" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="gambar_produk"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Gambar Produk</FormLabel>
                <FormControl>
                  <ImageUpload
                    onChange={(url) => field.onChange(url)}
                    onRemove={() => field.onChange("")}
                    values={field.value ? [field.value] : []}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex justify-end">
            <Button type="submit">Simpan</Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

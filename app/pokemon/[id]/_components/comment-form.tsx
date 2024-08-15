"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2Icon, SendIcon } from "lucide-react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import * as commentsApi from "@/lib/api/comments";

const commentInputSchema = z.object({
  content: z.string().min(1).max(200),
});

type CommentInput = z.infer<typeof commentInputSchema>;

interface Props {
  pokemonId: string;
}

export const CommentForm = ({ pokemonId }: Props) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<CommentInput>({
    resolver: zodResolver(commentInputSchema),
    defaultValues: { content: "" },
  });

  function handleSubmit(values: CommentInput) {
    startTransition(() => {
      commentsApi
        .create({ ...values, pokemonId })
        .then(() => {
          form.reset();
        })
        .catch(() => {
          toast({
            variant: "destructive",
            description: "Error adding comment",
          });
        });
    });
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center gap-2">
                <FormControl>
                  <Input placeholder="Send love" {...field} />
                </FormControl>
                <Button type="submit" disabled={isPending}>
                  {isPending ? (
                    <Loader2Icon className="h-5 w-5 animate-spin" />
                  ) : (
                    <SendIcon className="h-5 w-5" />
                  )}
                </Button>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
};

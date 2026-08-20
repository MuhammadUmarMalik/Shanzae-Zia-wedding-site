"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { CalendarDays, Clock3, Loader2, Send } from "lucide-react";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

const Calendar = dynamic(
  () => import("@/components/ui/calendar").then(module => module.Calendar),
  { ssr: false }
);

const bookingSchema = z.object({
  name: z.string().min(2, "Please enter your name."),
  email: z.string().email("Please enter a valid email address."),
  phone: z.string().min(7, "Please enter a valid phone number."),
  location: z.string().min(2, "Please share the shoot location."),
  date: z.date(),
  time: z.enum(["morning", "afternoon", "evening"]),
  message: z.string().min(12, "Tell me a little more about the occasion."),
});

type BookingValues = z.infer<typeof bookingSchema>;

function BookingField({
  label,
  id,
  error,
  children,
}: {
  label: string;
  id: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-2">
      <Label
        htmlFor={id}
        className="font-ui text-[0.6875rem] font-normal tracking-[0.1em] text-secondary-foreground/85 uppercase"
      >
        {label}
      </Label>
      {children}
      {error ? <p className="text-sm text-red-300">{error}</p> : null}
    </div>
  );
}

export function BookingForm() {
  const form = useForm<BookingValues>({
    resolver: zodResolver(bookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      location: "",
      time: "morning",
      message: "",
    },
  });

  const submitBooking = async (_values: BookingValues) => {
    await new Promise(resolve => window.setTimeout(resolve, 700));
    toast.success("Your details are ready to send.", {
      description:
        "Connect this static form to your preferred inbox before accepting live enquiries.",
    });
    form.reset({
      name: "",
      email: "",
      phone: "",
      location: "",
      time: "morning",
      message: "",
    });
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submitBooking)}
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        noValidate
      >
        <BookingField
          label="Name"
          id="name"
          error={form.formState.errors.name?.message}
        >
          <Input
            id="name"
            {...form.register("name")}
            placeholder="Your name"
            aria-invalid={Boolean(form.formState.errors.name)}
            className="h-12 rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm text-secondary-foreground placeholder:text-secondary-foreground/40"
          />
        </BookingField>
        <BookingField
          label="Email"
          id="email"
          error={form.formState.errors.email?.message}
        >
          <Input
            id="email"
            type="email"
            {...form.register("email")}
            placeholder="name@example.com"
            aria-invalid={Boolean(form.formState.errors.email)}
            className="h-12 rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm text-secondary-foreground placeholder:text-secondary-foreground/40"
          />
        </BookingField>
        <BookingField
          label="Phone"
          id="phone"
          error={form.formState.errors.phone?.message}
        >
          <Input
            id="phone"
            {...form.register("phone")}
            placeholder="Your phone number"
            aria-invalid={Boolean(form.formState.errors.phone)}
            className="h-12 rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm text-secondary-foreground placeholder:text-secondary-foreground/40"
          />
        </BookingField>
        <BookingField
          label="Location"
          id="location"
          error={form.formState.errors.location?.message}
        >
          <Input
            id="location"
            {...form.register("location")}
            placeholder="City or venue"
            aria-invalid={Boolean(form.formState.errors.location)}
            className="h-12 rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm text-secondary-foreground placeholder:text-secondary-foreground/40"
          />
        </BookingField>
        <BookingField
          label="Preferred date"
          id="date"
          error={form.formState.errors.date?.message}
        >
          <Popover>
            <PopoverTrigger asChild>
              <Button
                id="date"
                type="button"
                variant="outline"
                className="flex h-12 w-full justify-start rounded-sm border-secondary-foreground/25 bg-transparent px-3 font-ui text-sm font-normal text-secondary-foreground hover:bg-secondary-foreground/10"
              >
                <CalendarDays
                  size={16}
                  className="mr-2 text-secondary-foreground/60"
                />
                {form.watch("date") ? (
                  form.watch("date")?.toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                ) : (
                  <span className="text-secondary-foreground/50">
                    Choose a date
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              align="start"
              className="w-auto rounded-sm border-border bg-popover p-0 text-popover-foreground"
            >
              <Calendar
                mode="single"
                selected={form.watch("date")}
                onSelect={date => {
                  if (date)
                    form.setValue("date", date, {
                      shouldValidate: true,
                    });
                }}
                disabled={date =>
                  date < new Date(new Date().setHours(0, 0, 0, 0))
                }
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </BookingField>
        <BookingField
          label="Preferred time"
          id="time"
          error={form.formState.errors.time?.message}
        >
          <Select
            value={form.watch("time")}
            onValueChange={value =>
              form.setValue("time", value as BookingValues["time"], {
                shouldValidate: true,
              })
            }
          >
            <SelectTrigger
              id="time"
              className="h-12 rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm text-secondary-foreground"
            >
              <Clock3
                size={16}
                className="mr-2 text-secondary-foreground/60"
              />
              <SelectValue placeholder="Choose a time" />
            </SelectTrigger>
            <SelectContent className="rounded-sm border-border bg-popover text-popover-foreground">
              <SelectItem value="morning">Morning</SelectItem>
              <SelectItem value="afternoon">Afternoon</SelectItem>
              <SelectItem value="evening">Evening</SelectItem>
            </SelectContent>
          </Select>
        </BookingField>
        <div className="md:col-span-2">
          <BookingField
            label="Message"
            id="message"
            error={form.formState.errors.message?.message}
          >
            <Textarea
              id="message"
              {...form.register("message")}
              placeholder="Tell me about your event or photography requirements."
              aria-invalid={Boolean(form.formState.errors.message)}
              className="min-h-36 resize-y rounded-sm border-secondary-foreground/25 bg-transparent font-ui text-sm leading-7 text-secondary-foreground placeholder:text-secondary-foreground/40"
            />
          </BookingField>
        </div>
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={form.formState.isSubmitting}
            className="primary-button h-auto w-full py-4 disabled:opacity-60"
          >
            {form.formState.isSubmitting ? (
              <>
                <Loader2 size={16} className="animate-spin" /> Preparing
                your note…
              </>
            ) : (
              <>
                <Send size={15} /> Book a call
              </>
            )}
          </Button>
          <p className="mt-4 text-center text-xs font-light leading-5 text-secondary-foreground/55">
            This static preview validates your enquiry locally. Connect
            it to an inbox before accepting live submissions.
          </p>
        </div>
      </form>
    </Form>
  );
}
import { zodResolver } from "@hookform/resolvers/zod";
import { format } from "date-fns";
import { ArrowRight, Calendar as CalendarIcon, MapPin, Phone } from "lucide-react";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import { contactFormSchema, type ContactFormValues } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";
import Reveal from "./Reveal";

type ContactResponse = {
  message?: string;
  errors?: Partial<Record<keyof ContactFormValues, string[]>>;
};

export default function Contact({ notify }: { notify: (message: string) => void }) {
  const [dateOpen, setDateOpen] = useState(false);
  const {
    register,
    control,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: { name: "", email: "", date: "", message: "", company: "" },
    mode: "onTouched",
  });

  const submit = async (values: ContactFormValues) => {
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const result = (await response.json().catch(() => null)) as ContactResponse | null;

      if (!response.ok) {
        for (const [field, messages] of Object.entries(result?.errors ?? {})) {
          const message = messages?.[0];
          if (message) setError(field as keyof ContactFormValues, { message });
        }
        throw new Error(result?.message ?? "We could not send your request. Please try again.");
      }

      reset();
      notify("Tour request sent. We’ll be in touch shortly.");
    } catch (error) {
      notify(
        error instanceof Error
          ? error.message
          : "We could not send your request. Please try again.",
      );
    }
  };

  const fieldClasses =
    "mt-1 h-12 rounded-xl cursor-text text-foreground caret-foreground selection:bg-accent/40";

  return (
    <section id="contact" className="py-28 lg:py-40 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 lg:px-8 grid lg:grid-cols-2 gap-16">
        <Reveal>
          <div>
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground">
              Book a tour
            </div>
            <h2 className="mt-3 font-display text-4xl lg:text-6xl tracking-tight text-balance">
              Come see it
              <br />
              <span className="italic text-muted-foreground">in person.</span>
            </h2>
            <p className="mt-6 text-muted-foreground max-w-md">
              Private tours are available seven days a week. Tell us when works and our leasing team
              will confirm within one business day.
            </p>
            <div className="mt-10 space-y-4 text-sm">
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-accent" /> (905) 555-0184
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-accent" /> Maison Rive · Open 9–7 daily
              </div>
            </div>
          </div>
        </Reveal>

        <form
          onSubmit={handleSubmit(submit)}
          noValidate
          className="bg-background rounded-3xl p-6 lg:p-10 border border-border/50 space-y-5"
        >
          <div hidden aria-hidden="true">
            <label htmlFor="company">Company</label>
            <input id="company" tabIndex={-1} autoComplete="off" {...register("company")} />
          </div>
          <div>
            <label htmlFor="contact-name" className="text-xs text-muted-foreground">
              Your Full Name
            </label>
            <Input
              id="contact-name"
              autoComplete="name"
              {...register("name")}
              aria-invalid={Boolean(errors.name)}
              className={fieldClasses}
              placeholder="Jane Doe"
            />
            {errors.name && <p className="text-xs text-destructive mt-1">{errors.name.message}</p>}
          </div>
          <div>
            <label htmlFor="contact-email" className="text-xs text-muted-foreground">
              Your Email
            </label>
            <Input
              id="contact-email"
              type="email"
              inputMode="email"
              autoComplete="email"
              {...register("email")}
              aria-invalid={Boolean(errors.email)}
              className={fieldClasses}
              placeholder="jane@example.com"
            />
            {errors.email && (
              <p className="text-xs text-destructive mt-1">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label id="preferred-date-label" className="text-xs text-muted-foreground">
              Preferred Date to Visit
            </label>
            <Controller
              name="date"
              control={control}
              render={({ field }) => {
                const selected = field.value ? new Date(`${field.value}T12:00:00`) : undefined;
                return (
                  <Popover open={dateOpen} onOpenChange={setDateOpen}>
                    <PopoverTrigger asChild>
                      <Button
                        type="button"
                        variant="outline"
                        aria-labelledby="preferred-date-label"
                        aria-invalid={Boolean(errors.date)}
                        className={cn(
                          "mt-1 h-12 w-full justify-start rounded-xl px-3 text-left font-normal",
                          !selected && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {selected ? format(selected, "PPP") : "Choose a date"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto rounded-2xl p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={selected}
                        onSelect={(date) => {
                          field.onChange(date ? format(date, "yyyy-MM-dd") : "");
                          field.onBlur();
                          if (date) setDateOpen(false);
                        }}
                        disabled={{ before: new Date(new Date().setHours(0, 0, 0, 0)) }}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                );
              }}
            />
            {errors.date && <p className="text-xs text-destructive mt-1">{errors.date.message}</p>}
          </div>
          <div>
            <label htmlFor="contact-message" className="text-xs text-muted-foreground">
              Message
            </label>
            <Textarea
              id="contact-message"
              {...register("message")}
              aria-invalid={Boolean(errors.message)}
              className="mt-1 min-h-[140px] rounded-xl p-3 cursor-text text-foreground caret-foreground selection:bg-accent/40"
              placeholder="Tell us what you want to see or ask about your visit."
            />
            {errors.message && (
              <p className="text-xs text-destructive mt-1">{errors.message.message}</p>
            )}
          </div>
          <Button
            type="submit"
            size="lg"
            disabled={isSubmitting}
            className="w-full h-14 rounded-full bg-charcoal text-primary-foreground hover:bg-charcoal/90"
          >
            {isSubmitting ? "Sending…" : "Send Email"} <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </form>
      </div>
    </section>
  );
}

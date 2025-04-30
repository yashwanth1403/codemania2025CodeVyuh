import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "../components/ui/use-toast";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  createChallenge,
  CreateChallengeDTO,
} from "../services/challengeService";
import { cn } from "../lib/utils";
import { useAuth } from "../contexts/AuthContext";

// UI components (adjust import paths as needed)
import NavigationBar from "../components/NavigationBar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Button } from "../components/ui/button";
import { Calendar } from "../components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";

// Define the form schema
const formSchema = z
  .object({
    title: z.string().min(5, {
      message: "Title must be at least 5 characters.",
    }),
    description: z.string().min(20, {
      message: "Description must be at least 20 characters.",
    }),
    difficulty: z.enum(["EASY", "MEDIUM", "HARD"], {
      required_error: "Please select a difficulty level.",
    }),
    startDate: z.date({
      required_error: "Please select a start date.",
    }),
    endDate: z.date({
      required_error: "Please select an end date.",
    }),
    thumbnailUrl: z
      .string()
      .url({
        message: "Please enter a valid URL.",
      })
      .optional(),
    xpReward: z.coerce
      .number()
      .positive({
        message: "XP reward must be a positive number.",
      })
      .default(100),
    tags: z.string().optional(),
    maxParticipants: z.coerce
      .number()
      .positive({
        message: "Max participants must be a positive number.",
      })
      .default(5),
  })
  .refine((data) => data.endDate > data.startDate, {
    message: "End date must be after start date.",
    path: ["endDate"],
  });

type FormValues = z.infer<typeof formSchema>;

const CreateChallenge: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      difficulty: "MEDIUM",
      startDate: new Date(Date.now() + 24 * 60 * 60 * 1000), // Tomorrow
      endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // One week from now
      thumbnailUrl: "",
      xpReward: 100,
      tags: "",
      maxParticipants: 5,
    },
  });

  // Handle form submission
  const onSubmit = async (values: FormValues) => {
    // If user is not logged in, we'll proceed anyway without checking authentication
    setIsSubmitting(true);

    try {
      // Convert the form values to the DTO format
      const challengeData: CreateChallengeDTO = {
        title: values.title,
        description: values.description,
        difficulty: values.difficulty,
        startDate: values.startDate,
        endDate: values.endDate,
        thumbnailUrl: values.thumbnailUrl || undefined,
        xpReward: values.xpReward,
        tags: values.tags,
        maxParticipants: values.maxParticipants,
      };

      // Create the challenge using our service
      const newChallenge = await createChallenge(challengeData);

      toast({
        title: "Challenge Created",
        description: "Your challenge has been created successfully!",
      });

      // Navigate to challenges page
      navigate("/challenges");
    } catch (error) {
      console.error("Error creating challenge:", error);
      toast({
        title: "Error",
        description: "Failed to create challenge. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen text-white overflow-hidden relative">
      {/* Dynamic background */}
      <div className="cosmic-gradient absolute inset-0 -z-10"></div>

      {/* Dark overlay for readability */}
      <div className="absolute inset-0 bg-black/30 -z-10"></div>

      {/* Navigation */}
      <NavigationBar />

      {/* Main content */}
      <main className="container mx-auto px-4 pt-32 pb-20">
        <div className="mb-8">
          <h1 className="text-4xl font-bold">
            <span className="bg-gradient-to-r from-white to-cosmic-light bg-clip-text text-transparent">
              Create Challenge
            </span>
          </h1>
          <p className="text-cosmic-light mt-2">
            Design a collaboration opportunity for the community
          </p>
        </div>

        <Card className="holographic-card border-0 max-w-3xl mx-auto">
          <CardHeader>
            <CardTitle>Challenge Details</CardTitle>
            <CardDescription className="text-cosmic-light">
              Create a challenge to spark collaboration within the community
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter a catchy title for your challenge"
                          {...field}
                          className="bg-cosmic-dark/40 border-cosmic-primary/30"
                        />
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
                        <Textarea
                          placeholder="Describe what participants will create in this challenge"
                          {...field}
                          className="bg-cosmic-dark/40 border-cosmic-primary/30 min-h-[120px]"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="difficulty"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Difficulty</FormLabel>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                        >
                          <FormControl>
                            <SelectTrigger className="bg-cosmic-dark/40 border-cosmic-primary/30">
                              <SelectValue placeholder="Select difficulty" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="EASY">Beginner</SelectItem>
                            <SelectItem value="MEDIUM">Intermediate</SelectItem>
                            <SelectItem value="HARD">Advanced</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="xpReward"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>XP Reward</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="bg-cosmic-dark/40 border-cosmic-primary/30"
                          />
                        </FormControl>
                        <FormDescription className="text-cosmic-light/70 text-xs">
                          Points participants will earn upon completion
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>Start Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal bg-cosmic-dark/40 border-cosmic-primary/30",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) => date < new Date()}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="endDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>End Date</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant="outline"
                                className={cn(
                                  "pl-3 text-left font-normal bg-cosmic-dark/40 border-cosmic-primary/30",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              initialFocus
                              disabled={(date) =>
                                date < new Date(form.getValues().startDate)
                              }
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="thumbnailUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Thumbnail URL</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="https://example.com/image.jpg"
                          {...field}
                          className="bg-cosmic-dark/40 border-cosmic-primary/30"
                        />
                      </FormControl>
                      <FormDescription className="text-cosmic-light/70 text-xs">
                        URL for a representative image (optional)
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Tags</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="AI/ML, UX/UI, Mobile"
                            {...field}
                            className="bg-cosmic-dark/40 border-cosmic-primary/30"
                          />
                        </FormControl>
                        <FormDescription className="text-cosmic-light/70 text-xs">
                          Comma-separated list of tags
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="maxParticipants"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Max Participants</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            {...field}
                            className="bg-cosmic-dark/40 border-cosmic-primary/30"
                          />
                        </FormControl>
                        <FormDescription className="text-cosmic-light/70 text-xs">
                          Maximum number of collaborators
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex justify-end space-x-4 mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate("/challenges")}
                    className="border-cosmic-light/30 text-cosmic-light"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-cosmic-secondary to-cosmic-accent hover:from-cosmic-accent hover:to-cosmic-secondary"
                  >
                    {isSubmitting ? "Creating..." : "Create Challenge"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default CreateChallenge;

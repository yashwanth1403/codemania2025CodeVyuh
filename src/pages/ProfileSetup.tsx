import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Textarea } from "../components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import PuzzlePiece from "../components/PuzzlePiece";
import SkillBubble from "../components/SkillBubble";
import { useAuth } from "@/contexts/AuthContext";

const API_URL = "http://localhost:8000/api";

// Skill categories for organization
const SKILL_CATEGORIES = [
  "Programming",
  "Design",
  "Marketing",
  "Writing",
  "Business",
  "Science",
  "Engineering",
  "Arts",
  "Communication",
  "Leadership",
  "Other",
];

// Experience levels for the dropdown
const EXPERIENCE_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

// Social platforms for the social links section - reduced to only 3 essential platforms
const SOCIAL_PLATFORMS = ["GitHub", "LinkedIn", "Twitter"];

type Skill = {
  name: string;
  category: string;
};

type Interest = {
  name: string;
  category: string;
};

type SocialLink = {
  platform: string;
  url: string;
};

type ProfileFormData = {
  clerkId: string;
  email: string;
  username: string;
  name: string;
  bio: string;
  avatarUrl: string;
  experienceLevel: string;
  skills: Skill[];
  interests: Interest[];
  socialLinks: SocialLink[];
};

// For demonstration, set up a mock user
const mockUser = {
  clerkId: "user_" + Math.random().toString(36).substring(2, 10),
  email: "demo@example.com",
  name: "Demo User",
};

interface ApiError {
  message: string;
}

const ProfileSetup: React.FC = () => {
  const navigate = useNavigate();
  const { user, updateUser } = useAuth();
  const [currentStep, setCurrentStep] = useState<number>(1);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [currentSkill, setCurrentSkill] = useState<string>("");
  const [currentSkillCategory, setCurrentSkillCategory] =
    useState<string>("Programming");
  const [currentInterest, setCurrentInterest] = useState<string>("");
  const [currentInterestCategory, setCurrentInterestCategory] =
    useState<string>("Programming");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [profileData, setProfileData] = useState<ProfileFormData>({
    clerkId: mockUser.clerkId,
    email: mockUser.email,
    username: "",
    name: mockUser.name,
    bio: "",
    avatarUrl: "",
    experienceLevel: "Beginner",
    skills: [],
    interests: [],
    socialLinks: [],
  });

  // Redirect if not logged in or already has profile
  React.useEffect(() => {
    if (!user) {
      navigate("/login");
    } else if (user.profileComplete) {
      navigate("/dashboard");
    } else {
      // Set initial profile data from user context
      setProfileData((prev) => ({
        ...prev,
        clerkId: user.clerkId,
        email: user.email,
        name: user.name || prev.name,
      }));
    }
  }, [user, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfileData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleExperienceLevelChange = (value: string) => {
    setProfileData((prev) => ({
      ...prev,
      experienceLevel: value,
    }));
  };

  const addSkill = () => {
    if (currentSkill.trim() !== "") {
      const newSkill = {
        name: currentSkill.trim(),
        category: currentSkillCategory,
      };
      setSkills([...skills, newSkill]);
      setCurrentSkill("");
    }
  };

  const removeSkill = (skillToRemove: Skill) => {
    setSkills(skills.filter((skill) => skill.name !== skillToRemove.name));
  };

  const addInterest = () => {
    if (currentInterest.trim() !== "") {
      const newInterest = {
        name: currentInterest.trim(),
        category: currentInterestCategory,
      };
      setInterests([...interests, newInterest]);
      setCurrentInterest("");
    }
  };

  const removeInterest = (interestToRemove: Interest) => {
    setInterests(
      interests.filter((interest) => interest.name !== interestToRemove.name)
    );
  };

  const addSocialLink = (platform: string, url: string) => {
    if (url.trim() !== "") {
      const newLink = { platform, url: url.trim() };
      setSocialLinks([...socialLinks, newLink]);

      // Reset the input field after adding
      const inputElement = document.getElementById(
        `${platform.toLowerCase()}-link`
      ) as HTMLInputElement;
      if (inputElement) {
        inputElement.value = "";
      }
    }
  };

  const removeSocialLink = (platform: string) => {
    setSocialLinks(socialLinks.filter((link) => link.platform !== platform));
  };

  const handleNextStep = () => {
    // Simple validation before moving to next step
    if (currentStep === 1) {
      if (!profileData.username || !profileData.name) {
        setError("Username and name are required");
        return;
      }
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
      setError(null);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      setError(null);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    // Validate at least one social link
    if (socialLinks.length === 0) {
      setError("At least one social link is required");
      setIsLoading(false);
      return;
    }

    try {
      // Prepare basic user data
      const userData = {
        clerkId: profileData.clerkId,
        email: profileData.email,
        username: profileData.username,
        name: profileData.name,
        bio: profileData.bio,
        avatarUrl: profileData.avatarUrl,
        experienceLevel: profileData.experienceLevel,
        profileComplete: true,
      };

      console.log("Submitting user data:", userData);

      // 1. Create the user first
      const userResponse = await fetch(`${API_URL}/users`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      if (!userResponse.ok) {
        const errorData = await userResponse.json();
        throw new Error(errorData.message || "Failed to create user");
      }

      const userResult = await userResponse.json();
      const userId = userResult.data.user.id;
      console.log("User created successfully with ID:", userId);

      // 2. Add skills
      if (skills.length > 0) {
        const skillsResponse = await fetch(
          `${API_URL}/profiles/${userId}/skills`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ skills }),
          }
        );

        if (!skillsResponse.ok) {
          console.error("Failed to add skills:", await skillsResponse.json());
        }
      }

      // 3. Add interests
      if (interests.length > 0) {
        const interestsResponse = await fetch(
          `${API_URL}/profiles/${userId}/interests`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ interests }),
          }
        );

        if (!interestsResponse.ok) {
          console.error(
            "Failed to add interests:",
            await interestsResponse.json()
          );
        }
      }

      // 4. Add social links (already validated to have at least one)
      for (const link of socialLinks) {
        const socialLinkResponse = await fetch(
          `${API_URL}/profiles/${userId}/social-links`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(link),
          }
        );

        if (!socialLinkResponse.ok) {
          console.error(
            "Failed to add social link:",
            await socialLinkResponse.json()
          );
        }
      }

      // After successful profile creation, update the auth context
      updateUser({
        id: userId,
        profileComplete: true,
        ...userData,
        skills,
        interests,
        socialLinks,
      });

      // Navigate to the dashboard after successful profile setup
      navigate("/dashboard");
    } catch (err: unknown) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("An unexpected error occurred");
      }
      console.error("Profile setup error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <Card className="shadow-xl bg-white/90 backdrop-blur-sm border-blue-100">
          <CardHeader className="pb-4">
            <div className="flex items-center gap-3">
              <PuzzlePiece className="h-10 w-10 text-blue-500" />
              <div>
                <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-transparent bg-clip-text">
                  Let's Set Up Your CollabSpark Profile
                </CardTitle>
                <CardDescription className="text-gray-600 mt-1">
                  Complete your profile to start connecting with other
                  collaborators
                </CardDescription>
              </div>
            </div>

            {/* Progress steps */}
            <div className="flex justify-between items-center mt-8 px-2">
              <div className="w-full flex items-center">
                <div
                  className={`rounded-full transition-colors w-8 h-8 flex items-center justify-center font-medium ${
                    currentStep >= 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  1
                </div>
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    currentStep >= 2 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`rounded-full transition-colors w-8 h-8 flex items-center justify-center font-medium ${
                    currentStep >= 2
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  2
                </div>
                <div
                  className={`h-1 flex-1 mx-2 transition-colors ${
                    currentStep >= 3 ? "bg-blue-600" : "bg-gray-200"
                  }`}
                ></div>
                <div
                  className={`rounded-full transition-colors w-8 h-8 flex items-center justify-center font-medium ${
                    currentStep >= 3
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 text-gray-500"
                  }`}
                >
                  3
                </div>
              </div>
            </div>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="pt-2">
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md mb-6">
                  {error}
                </div>
              )}

              {/* Step 1: Basic Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="username">
                          Username<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="username"
                          name="username"
                          placeholder="yourname123"
                          value={profileData.username}
                          onChange={handleChange}
                          required
                        />
                        <p className="text-xs text-gray-500">
                          This will be your unique identifier in CollabSpark
                        </p>
                      </div>

                      <div className="space-y-2">
                        <Label htmlFor="name">
                          Full Name<span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="name"
                          name="name"
                          placeholder="Your Name"
                          value={profileData.name}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="your.email@example.com"
                        value={profileData.email}
                        onChange={handleChange}
                        disabled
                      />
                      <p className="text-xs text-gray-500">
                        Your email from Clerk authentication
                      </p>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="avatarUrl">Profile Picture URL</Label>
                      <Input
                        id="avatarUrl"
                        name="avatarUrl"
                        placeholder="https://example.com/your-image.jpg"
                        value={profileData.avatarUrl}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="bio">Bio</Label>
                      <Textarea
                        id="bio"
                        name="bio"
                        placeholder="Tell us a bit about yourself, your interests, and what you hope to collaborate on..."
                        value={profileData.bio}
                        onChange={handleChange}
                        rows={4}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="experienceLevel">Experience Level</Label>
                      <Select
                        value={profileData.experienceLevel}
                        onValueChange={handleExperienceLevelChange}
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select your experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          {EXPERIENCE_LEVELS.map((level) => (
                            <SelectItem key={level} value={level}>
                              {level}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 2: Skills & Interests */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Skills & Interests
                    </h3>

                    {/* Skills Section */}
                    <div className="space-y-3 pb-4 border-b border-gray-200">
                      <Label>Skills</Label>
                      <p className="text-sm text-gray-500">
                        What skills can you bring to collaborations?
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {skills.map((skill, index) => (
                          <SkillBubble
                            key={index}
                            label={skill.name}
                            category={skill.category}
                            onRemove={() => removeSkill(skill)}
                          />
                        ))}
                        {skills.length === 0 && (
                          <p className="text-sm text-gray-400 italic">
                            Add some skills to showcase your talents
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <Select
                            value={currentSkillCategory}
                            onValueChange={setCurrentSkillCategory}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {SKILL_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Input
                            placeholder="Add a skill (e.g. React, UI Design)"
                            value={currentSkill}
                            onChange={(e) => setCurrentSkill(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addSkill();
                              }
                            }}
                          />
                          <Button type="button" onClick={addSkill}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>

                    {/* Interests Section */}
                    <div className="space-y-3 pt-2">
                      <Label>Interests</Label>
                      <p className="text-sm text-gray-500">
                        What topics are you interested in exploring?
                      </p>

                      <div className="flex flex-wrap gap-2 mb-3">
                        {interests.map((interest, index) => (
                          <SkillBubble
                            key={index}
                            label={interest.name}
                            category={interest.category}
                            onRemove={() => removeInterest(interest)}
                            color="green"
                          />
                        ))}
                        {interests.length === 0 && (
                          <p className="text-sm text-gray-400 italic">
                            Add some interests to find matching collaborations
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        <div className="col-span-1">
                          <Select
                            value={currentInterestCategory}
                            onValueChange={setCurrentInterestCategory}
                          >
                            <SelectTrigger className="w-full">
                              <SelectValue placeholder="Category" />
                            </SelectTrigger>
                            <SelectContent>
                              {SKILL_CATEGORIES.map((category) => (
                                <SelectItem key={category} value={category}>
                                  {category}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="md:col-span-2 flex gap-2">
                          <Input
                            placeholder="Add an interest (e.g. Machine Learning, Game Design)"
                            value={currentInterest}
                            onChange={(e) => setCurrentInterest(e.target.value)}
                            onKeyDown={(e) => {
                              if (e.key === "Enter") {
                                e.preventDefault();
                                addInterest();
                              }
                            }}
                          />
                          <Button type="button" onClick={addInterest}>
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Step 3: Social Links */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium text-gray-800">
                      Connect Your Profiles
                    </h3>
                    <p className="text-sm text-gray-500">
                      Add links to your professional profiles to help others see
                      your work.{" "}
                      <span className="text-red-500 font-medium">
                        At least one social link is required.
                      </span>
                    </p>

                    <div className="grid grid-cols-1 gap-6">
                      {SOCIAL_PLATFORMS.map((platform) => {
                        const existingLink = socialLinks.find(
                          (link) => link.platform === platform
                        );

                        return (
                          <div key={platform} className="space-y-2">
                            <Label htmlFor={`${platform.toLowerCase()}-link`}>
                              {platform}{" "}
                              {platform === "GitHub" && (
                                <span className="text-red-500">*</span>
                              )}
                            </Label>
                            {existingLink ? (
                              <div className="flex gap-2">
                                <Input
                                  value={existingLink.url}
                                  disabled
                                  className="flex-1"
                                />
                                <Button
                                  type="button"
                                  variant="outline"
                                  onClick={() => removeSocialLink(platform)}
                                >
                                  Remove
                                </Button>
                              </div>
                            ) : (
                              <div className="flex gap-2">
                                <Input
                                  id={`${platform.toLowerCase()}-link`}
                                  placeholder={`Your ${platform} URL`}
                                  className="flex-1"
                                  onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                      e.preventDefault();
                                      addSocialLink(
                                        platform,
                                        (e.target as HTMLInputElement).value
                                      );
                                    }
                                  }}
                                />
                                <Button
                                  type="button"
                                  onClick={(e) => {
                                    const input = document.getElementById(
                                      `${platform.toLowerCase()}-link`
                                    ) as HTMLInputElement;
                                    addSocialLink(platform, input.value);
                                  }}
                                >
                                  Add
                                </Button>
                              </div>
                            )}
                            <p className="text-xs text-gray-500">
                              {platform === "GitHub"
                                ? "Share your code repositories and projects"
                                : platform === "LinkedIn"
                                ? "Connect with your professional network"
                                : "Share updates and engage with the community"}
                            </p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </CardContent>

            <CardFooter className="flex justify-between">
              <Button
                type="button"
                variant="outline"
                onClick={handlePrevStep}
                disabled={currentStep === 1 || isLoading}
              >
                Previous
              </Button>

              <div className="flex gap-2">
                {currentStep < 3 ? (
                  <Button
                    type="button"
                    variant="gradient"
                    onClick={handleNextStep}
                    disabled={isLoading}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    variant="gradient"
                    disabled={isLoading || socialLinks.length === 0}
                  >
                    {isLoading ? "Creating Profile..." : "Create Profile"}
                  </Button>
                )}
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileSetup;

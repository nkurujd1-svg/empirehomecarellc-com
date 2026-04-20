import {
  Heart,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Home,
  HandHeart,
  Star,
  Smile,
  Sparkles,
  Briefcase,
  type LucideIcon,
} from "lucide-react";

export const ICON_MAP: Record<string, LucideIcon> = {
  Heart,
  Shield,
  Award,
  Users,
  CheckCircle2,
  Home,
  HandHeart,
  Star,
  Smile,
  Sparkles,
  Briefcase,
};

export const ICON_NAMES = Object.keys(ICON_MAP);

export function getIcon(name?: string | null): LucideIcon {
  if (!name) return Heart;
  return ICON_MAP[name] || Heart;
}

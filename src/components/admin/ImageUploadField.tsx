import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Loader2, ImageIcon } from "lucide-react";
import { uploadSiteAsset } from "@/lib/uploadSiteAsset";
import { toast } from "@/hooks/use-toast";

interface ImageUploadFieldProps {
  value: string | null | undefined;
  onChange: (url: string) => void;
  folder?: "logo" | "hero" | "services" | "about" | "misc";
  label?: string;
  className?: string;
  aspectRatio?: "square" | "video" | "portrait";
}

const aspectClasses = {
  square: "aspect-square",
  video: "aspect-video",
  portrait: "aspect-[3/4]",
};

export const ImageUploadField = ({
  value,
  onChange,
  folder = "misc",
  label = "Image",
  className = "",
  aspectRatio = "video",
}: ImageUploadFieldProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);

  const handleFile = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast({ title: "Invalid file", description: "Please choose an image.", variant: "destructive" });
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast({ title: "File too large", description: "Max 5MB.", variant: "destructive" });
      return;
    }
    setUploading(true);
    const url = await uploadSiteAsset(file, folder);
    setUploading(false);
    if (url) {
      onChange(url);
      toast({ title: "Image uploaded" });
    } else {
      toast({ title: "Upload failed", description: "Please try again.", variant: "destructive" });
    }
  };

  return (
    <div className={className}>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleFile(file);
          e.target.value = "";
        }}
      />
      <div className={`relative ${aspectClasses[aspectRatio]} rounded-lg border-2 border-dashed border-border bg-muted/30 overflow-hidden flex items-center justify-center`}>
        {value ? (
          <img src={value} alt={label} className="w-full h-full object-cover" />
        ) : (
          <div className="text-center text-muted-foreground p-4">
            <ImageIcon className="h-10 w-10 mx-auto mb-2 opacity-50" />
            <p className="text-xs">No image yet</p>
          </div>
        )}
        {uploading && (
          <div className="absolute inset-0 bg-background/80 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        )}
      </div>
      <Button
        type="button"
        variant="outline"
        size="sm"
        className="mt-2 w-full"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
      >
        <Upload className="h-3.5 w-3.5 mr-2" />
        {value ? "Replace image" : "Upload image"}
      </Button>
    </div>
  );
};

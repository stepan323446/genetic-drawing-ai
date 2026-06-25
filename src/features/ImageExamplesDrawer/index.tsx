import { Button } from "@/shadcn/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/shadcn/components/ui/drawer";
import { exampleData } from "./data";
import { Typography } from "@/shared";
import { useGA } from "@/app/providers/AppContext";
import loadImage from "@/utils/loadImage";

interface ImageExamplesDrawerProps {
  open: boolean
  onOpenChange: (val: boolean) => void
  size: number
}

const ImageExamplesDrawer = ({
  open,
  onOpenChange,
  size
}: ImageExamplesDrawerProps) => {
  const { userPixels, updateUserTrigger } = useGA();

  const selectImage = async (imageUrl: string) => {
    try {
      const response = await fetch(imageUrl);
      const blob = await response.blob();

      const file = new File([blob], "image.png", { type: blob.type });
      
      const pixels = await loadImage(file, size);
      userPixels.current.set(pixels);
      updateUserTrigger();
      
    } catch (error) {
      console.error("Error file convertation: ", error);
    }

    onOpenChange(false);  
  };

  return (
    <Drawer direction="right" open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Image examples</DrawerTitle>
          <DrawerDescription>
            Here you can choose from image examples for the canvas
          </DrawerDescription>
        </DrawerHeader>

        <div className="no-scrollbar overflow-y-auto px-4">
          {exampleData.map((section, i) => (
            <div key={i} className="mb-5">
              <Typography variant="h4" className="mb-3">
                {section.title}
              </Typography>
              <div className="grid grid-cols-4 gap-3">
                {section.imageUrls.map((imageUrl, j) => (
                  <div
                    key={j}
                    className="w-20 h-20 overflow-hidden rounded-md cursor-pointer hover:opacity-80"
                    onClick={() => selectImage(imageUrl)}
                  >
                    <img
                      src={imageUrl}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Cancel</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default ImageExamplesDrawer;

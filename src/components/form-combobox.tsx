import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/lib/utils";

import { Button } from "@/components/ui/button";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

interface FormComboboxProps {
  control: any;
  name: string;
  label: string;
  options?: {
    label: string;
    value: string;
  }[];
  isLoading?: boolean;
  placeholder?: string;
  onSelect?: () => void;
}

const FormCombobox = ({
  control,
  name,
  options = [],
  label,
  isLoading = false,
  placeholder = "Chọn",
  onSelect,
}: FormComboboxProps) => {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem className="flex flex-col">
          <FormLabel>{label}</FormLabel>
          <Popover>
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  variant="outline"
                  role="combobox"
                  className={cn("justify-between", !field.value && "text-muted-foreground")}
                  disabled={isLoading || field.disabled}
                >
                  {field.value
                    ? (options || []).find((option) => option.value === field.value)?.label
                    : placeholder}
                  <ChevronDown className="opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent className="w-[--radix-popover-trigger-width] p-0">
              <Command>
                <CommandInput placeholder="Tìm kiếm" className="h-9" />
                <CommandList>
                  {isLoading ? (
                    <CommandEmpty>Đang tải dữ liệu...</CommandEmpty>
                  ) : (
                    <CommandEmpty>Không có kết quả nào phù hợp</CommandEmpty>
                  )}

                  <CommandGroup>
                    {(options || []).map((option) => (
                      <CommandItem
                        value={option.label}
                        key={option.value}
                        onSelect={() => {
                          if (onSelect) onSelect();
                          else field.onChange(option.value);
                        }}
                      >
                        {option.label}
                        <Check
                          className={cn(
                            "ml-auto",
                            option.value === field.value ? "opacity-100" : "opacity-0",
                          )}
                        />
                      </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
export default FormCombobox;

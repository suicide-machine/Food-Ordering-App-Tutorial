import { FormDescription, FormField, FormItem } from "@/components/ui/form"
import { dishesList } from "@/config/restaurant-options-config"
import { useFormContext } from "react-hook-form"
import CuisineCheckbox from "./CuisineCheckbox"

const CuisinesSection = () => {
  const { control } = useFormContext()

  return (
    <div className="space-y-2">
      <div>
        <h2 className="text-2xl font-bold">Dishes</h2>

        <FormDescription>
          Select your favorite dishes that your restaurant serves
        </FormDescription>
      </div>

      <FormField
        control={control}
        name="cuisines"
        render={({ field }) => (
          <FormItem>
            <div className="grid md:grid-cols-5 gap-1">
              {dishesList.map((cuisineItem) => (
                <CuisineCheckbox cuisine={cuisineItem} field={field} />
              ))}
            </div>
          </FormItem>
        )}
      />
    </div>
  )
}

export default CuisinesSection

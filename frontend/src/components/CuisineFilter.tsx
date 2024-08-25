import { dishesList } from "@/config/restaurant-options-config"
import { Label } from "./ui/label"
import { Check, ChevronDown, ChevronUp } from "lucide-react"
import { ChangeEvent } from "react"
import { Button } from "./ui/button"

type Props = {
  onChange: (cuisines: string[]) => void
  selectedCuisines: string[]
  isExpanded: boolean
  OnExpandedClick: () => void
}

const CuisineFilter = ({
  onChange,
  selectedCuisines,
  isExpanded,
  OnExpandedClick,
}: Props) => {
  const handleCuisinesChange = (event: ChangeEvent<HTMLInputElement>) => {
    const selectedCuisine = event.target.value
    const isChecked = event.target.checked

    const newCuisinesList = isChecked
      ? [...selectedCuisines, selectedCuisine]
      : selectedCuisines.filter((cuisine) => cuisine !== selectedCuisine)

    onChange(newCuisinesList)
  }

  const handleCuisinesReset = () => onChange([])
  return (
    <>
      <div className="flex justify-between items-center px-2">
        <div className="text-md font-semibold mb-2">
          Filter By Cuisine or Dishes
        </div>

        <div
          className="text-sm font-semibold mb-2 underline cursor-pointer text-blue-600"
          onClick={handleCuisinesReset}
        >
          Reset Filters
        </div>
      </div>

      <div className="space-y-2 flex flex-col">
        {dishesList
          .slice(0, isExpanded ? dishesList.length : 7)
          .map((cuisine) => {
            const isSelected = selectedCuisines.includes(cuisine)

            return (
              <div className="flex">
                <input
                  id={`cuisine_${cuisine}`}
                  type="checkbox"
                  className="hidden"
                  value={cuisine}
                  checked={isSelected}
                  onChange={handleCuisinesChange}
                />

                <Label
                  htmlFor={`cuisine_${cuisine}`}
                  className={`flex flex-1 items-center cursor-pointer text-sm rounded-full px-4 py-2 font-semibold ${
                    isSelected
                      ? "border border-green-700 text-green-700"
                      : "border border-gray-300"
                  }`}
                >
                  {isSelected && <Check size={20} strokeWidth={3} />}
                  {cuisine}
                </Label>
              </div>
            )
          })}

        <Button
          onClick={OnExpandedClick}
          variant={"link"}
          className="mt-4 flex-1"
        >
          {isExpanded ? (
            <span className="flex flex-row items-center">
              View Less <ChevronUp />
            </span>
          ) : (
            <span className="flex flex-row items-center">
              View More
              <ChevronDown />
            </span>
          )}
        </Button>
      </div>
    </>
  )
}

export default CuisineFilter

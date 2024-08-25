import landingImage from "../assets/landingPage1.avif"
import appDownloadImage from "../assets/appDownloadImage.webp"
import { useNavigate } from "react-router-dom"
import SearchBar, { SearchForm } from "@/components/SearchBar"

const HomePage = () => {
  const navigate = useNavigate()

  const handleSearchSubmit = (searchFormValues: SearchForm) => {
    navigate({
      pathname: `/search/${searchFormValues.searchQuery}`,
    })
  }

  return (
    <div className="flex flex-col gap-12">
      <div className="md:px-32 bg-white rounded-lg shadow-md py-8 flex flex-col gap-5 text-center -mt-16">
        <h1 className="text-5xl font-bold tracking-tight text-red-600">
          Discover the best food & drinks now.
        </h1>

        <span className="text-xl">Food is just a click away!</span>

        <SearchBar
          placeHolder="Search by Location"
          onSubmit={handleSearchSubmit}
        />
      </div>

      <div className="grid md:grid-cols-2">
        <img src={landingImage} alt="" />

        <div className="flex flex-col items-center justify-center gap-4 text-center">
          <span className="font-bold text-3xl tracking-tighter">
            Get your favorite takeout in no time!
          </span>

          <span>
            Download the FoodieFlick App for quick ordering and personalized
            meal suggestions
          </span>

          <img src={appDownloadImage} alt="" className="w-60 h-40" />
        </div>
      </div>
    </div>
  )
}

export default HomePage

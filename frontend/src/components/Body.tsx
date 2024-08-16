import { Typography } from "@material-tailwind/react";
import { MouseEventHandler, useState } from "react";
import axios from 'axios'


export function Body() {
  const [fromAddress, setFromAddress] = useState("");
  const [toAddress, setToAddress] = useState("");

  const handleSubmit: MouseEventHandler<HTMLButtonElement> | undefined=async ()=>{
    const response1 = await axios({
      method:'get', 
      url: `https://nominatim.openstreetmap.org/search?q=${fromAddress}&format=json`
    })
    const latitude1 = response1[0].lat;
    const longitude1 = response1[0].lon;


    const response2 = await axios({
      method:'get', 
      url: `https://nominatim.openstreetmap.org/search?q=${toAddress}&format=json`
    })
    const latitude2 = response2[0].lat;
    const longitude2 = response2[0].lon;
    const distance = await axios({
      method:'get', 
      url: `https://api.distancematrix.ai/maps/api/distancematrix/json?origins=${latitude1},${longitude1}&destinations=${latitude2},${longitude2}&key=temZFnIvsyGVrvrAk9OaFUIBjOKxoKGVVKAHWF3TmAH5MBUl3LEl1f3XYxhqUDMC`
    })

    console.log(distance);
  }

  return (
    <div className="grid grid-cols-12 gap-4 text-white">
      <div className="col-span-6 m-36 ml-48">
        <p className="font-bold text-5xl">Go anywhere with Uber</p>
        <p className="font-semibold text-xl mt-2 mb-2">
          Request a ride, hop in, and go.
        </p>
        <div className="flex flex-col gap-2">
          <form>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setFromAddress(e.target.value);
                }}
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
          </form>
          <form>
            <label
              for="search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-black"
            >
              Search
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 20 20"
                >
                  <path
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  />
                </svg>
              </div>
              <input
                onChange={(e) => {
                  setToAddress(e.target.value);
                }}
                type="search"
                id="search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-white dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
              <button
              onClick={handleSubmit}
                type="submit"
                className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="col-span-6 mr-28 mt-28">
        <figure className="relative h-[690.5px] ml-20 w-[552.4px]">
          <img
            className="h-full w-full rounded-xl object-cover object-center"
            src="first.png"
            alt="nature image"
          />
          <figcaption className="absolute bottom-8 left-2/4 flex w-[calc(100%-4rem)] -translate-x-2/4 justify-between rounded-xl border border-white bg-white/75 py-4 px-6 shadow-lg shadow-black/5 saturate-200 backdrop-blur-sm">
            <div>
              <Typography variant="h5" color="blue-gray">
                Sara Lamalo
              </Typography>
              <Typography color="gray" className="mt-2 font-normal">
                20 July 2022
              </Typography>
            </div>
            <Typography variant="h5" color="blue-gray">
              Growth
            </Typography>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}

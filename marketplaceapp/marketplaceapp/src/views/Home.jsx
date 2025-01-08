export default function Home() {
    return (
        <>
            {/* Hero Section */}
            <div className="bg-white">
                <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                            Welcome to <span className="text-indigo-600">ArtMarket</span>
                        </h1>
                        <p className="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                            Discover unique digital art pieces and collect NFTs from talented artists around the world.
                        </p>
                    </div>
                </div>
            </div>

            {/* Art Cards Section */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                    {/* Art Card 1 */}
                    <div className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                            <img
                                src="https://images.unsplash.com/photo-1567359781514-3b964e2b04d6"
                                alt="Abstract Art"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href="#" className="font-medium">
                                        Abstract Dreams
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">by John Doe</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">0.5 ETH</p>
                        </div>
                        <div className="mt-4 flex justify-between space-x-2">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                Buy Now
                            </button>
                            <a href="#" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                                See Details
                            </a>
                        </div>
                    </div>

                    {/* Art Card 2 */}
                    <div className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                            <img
                                src="https://images.unsplash.com/photo-1549490349-8643362247b5"
                                alt="Digital Landscape"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href="#" className="font-medium">
                                        Digital Landscape
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">by Jane Smith</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">0.8 ETH</p>
                        </div>
                        <div className="mt-4 flex justify-between space-x-2">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                Buy Now
                            </button>
                            <a href="#" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                                See Details
                            </a>
                        </div>
                    </div>

                    {/* Art Card 3 */}
                    <div className="group relative">
                        <div className="w-full min-h-80 bg-gray-200 rounded-md overflow-hidden group-hover:opacity-75">
                            <img
                                src="https://images.unsplash.com/photo-1634986666676-ec8fd927c23d"
                                alt="3D Sculpture"
                                className="w-full h-full object-center object-cover"
                            />
                        </div>
                        <div className="mt-4 flex justify-between">
                            <div>
                                <h3 className="text-sm text-gray-700">
                                    <a href="#" className="font-medium">
                                        3D Sculpture
                                    </a>
                                </h3>
                                <p className="mt-1 text-sm text-gray-500">by Mike Johnson</p>
                            </div>
                            <p className="text-sm font-medium text-gray-900">1.2 ETH</p>
                        </div>
                        <div className="mt-4 flex justify-between space-x-2">
                            <button className="flex-1 bg-indigo-600 text-white px-4 py-2 rounded-md hover:bg-indigo-700">
                                Buy Now
                            </button>
                            <a href="#" className="text-indigo-600 hover:text-indigo-500 flex items-center">
                                See Details
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
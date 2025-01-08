export default function Tokens() {
    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div className="text-center mb-12">
                <h1 className="text-3xl font-bold text-gray-900 sm:text-4xl">
                    Your NFT Tokens
                </h1>
                <p className="mt-3 text-xl text-gray-500">
                    Manage your digital art collection
                </p>
            </div>

            {/* Wallet Information */}
            <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900">Wallet Balance</h2>
                        <p className="text-3xl font-bold text-indigo-600 mt-2">2.5 ETH</p>
                    </div>
                    <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700">
                        Connect Wallet
                    </button>
                </div>
            </div>

            {/* Token Grid */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {[1, 2, 3, 4, 5, 6].map((token) => (
                    <div key={token} className="bg-white rounded-lg shadow-lg overflow-hidden">
                        <div className="p-6">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-gray-900">Token #{token}</h3>
                                <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                    Active
                                </span>
                            </div>
                            <p className="mt-2 text-sm text-gray-500">
                                Unique digital artwork token with proof of ownership
                            </p>
                            <div className="mt-4 flex justify-between items-center">
                                <span className="text-sm font-medium text-gray-900">0.5 ETH</span>
                                <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-indigo-600 bg-indigo-100 hover:bg-indigo-200">
                                    Transfer
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Transaction History */}
            <div className="mt-12">
                <h2 className="text-xl font-semibold text-gray-900 mb-4">Transaction History</h2>
                <div className="bg-white shadow overflow-hidden sm:rounded-md">
                    <ul className="divide-y divide-gray-200">
                        {[1, 2, 3].map((transaction) => (
                            <li key={transaction} className="px-6 py-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-medium text-gray-900">
                                            Token Purchase #{transaction}
                                        </p>
                                        <p className="text-sm text-gray-500">
                                            {new Date().toLocaleDateString()}
                                        </p>
                                    </div>
                                    <span className="text-sm text-indigo-600">0.5 ETH</span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
}

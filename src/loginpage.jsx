import React from 'react'

function loginpage() {
  return (
    <div>
        <section className="bg-white">
    <div className="grid grid-cols-1 lg:grid-cols-2">
        <div className="flex items-center justify-center px-4 py-10 bg-white sm:px-6 lg:px-8 sm:py-16 lg:py-24">
            <div className="xl:w-full xl:max-w-sm 2xl:max-w-md xl:mx-auto">
                <h2 className="text-3xl font-bold leading-tight text-black sm:text-4xl">Sign in shopping list</h2>
                <p className="mt-2 text-base text-gray-600">Don’t have an account? <a href="#" title="" className="font-medium text-blue-600 transition-all duration-200 hover:text-blue-700 hover:underline focus:text-blue-700">Create a free account</a></p>

                <form action="#" method="POST" className="mt-8">
                    <div className="space-y-5">
                        <div>
                            <label className="text-base font-medium text-gray-900"> Email address </label>
                            <div className="mt-2.5">
                                <input
                                    type="email"
                                    placeholder="Enter email to get started"
                                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="text-base font-medium text-gray-900"> Password </label>

                                <a href="#" title="" className="text-sm font-medium text-blue-600 hover:underline hover:text-blue-700 focus:text-blue-700"> Forgot password? </a>
                            </div>
                            <div className="mt-2.5">
                                <input
                                    type="password"
                                    placeholder="Enter your password"
                                    className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 border border-gray-200 rounded-md bg-gray-50 focus:outline-none focus:border-blue-600 focus:bg-white caret-blue-600"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="inline-flex items-center justify-center w-full px-4 py-4 text-base font-semibold text-white transition-all duration-200 bg-blue-600 border border-transparent rounded-md focus:outline-none hover:bg-blue-700 focus:bg-blue-700">Log in</button>
                        </div>
                    </div>
                </form>

                <div className="mt-3 space-y-3">
                    

                    
                </div>
            </div>
        </div>

        <div className="flex items-center justify-center px-4 py-10 sm:py-16 lg:py-24 bg-gray-50 sm:px-6 lg:px-8">
            <div>
                <img className="w-full mx-auto" src="https://media.istockphoto.com/id/1277302463/photo/christmas-online-shopping-flat-lay-girl-writing-shopping-list-laptop-present-box-cup-of-coffee.jpg?s=612x612&w=0&k=20&c=cIS0haQaRzXeP3L5tBVa-iqdBBtx9uwJR6TOY_S1DAA=" alt="" />

                <div className="w-full max-w-md mx-auto xl:max-w-xl">
                    <h3 className="text-2xl font-bold text-center text-black">create your own shopping list</h3>
                    <p className="leading-relaxed text-center text-gray-500 mt-2.5">Your Smart List for Smart Shopping</p>

                    <div className="flex items-center justify-center mt-10 space-x-3">
                        <div className="bg-orange-500 rounded-full w-20 h-1.5"></div>

                        <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>

                        <div className="bg-gray-200 rounded-full w-12 h-1.5"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

</div>
  )
}

export default loginpage
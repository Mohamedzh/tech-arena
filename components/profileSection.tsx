import { PaperClipIcon } from '@heroicons/react/20/solid'
import { createBrowserSupabaseClient, User } from '@supabase/auth-helpers-nextjs'
import { BarsArrowUpIcon, UsersIcon } from '@heroicons/react/20/solid'
import { useState } from 'react'

type Props = {
    user: User
}

export default function ProfileSection({ user }: Props) {
    const [supabaseClient] = useState(() => createBrowserSupabaseClient())

    const updateUserData = async (newName: string) => {
        const { data, error } = await supabaseClient.auth.updateUser({ data: { nickName: newName } })
        console.log(data);
    }

    const updateUserEmail = async (newEmail: string) => {
        const { data, error } = await supabaseClient.auth.updateUser({ email: newEmail })
        console.log(data);
    }

    const updateUserPassword = async (newPassword: string) => {
        const { data, error } = await supabaseClient.auth.updateUser({ password: newPassword })
        console.log(data);
    }

    const [show, setShow] = useState<boolean>(false)
    const [item, setItem] = useState<string>()

    const userData = [
        { name: 'Nickname', value: user.user_metadata.nickName, placeHolder: 'Your new Nickname', disabled: false },
        { name: 'Email Address', value: user.email, placeHolder: 'Your new email address', disabled: false },
        { name: 'Password', value: '******', placeHolder: 'Your new password', disabled: false },
    ]

    const setActiveItem = (data: any[], name: string) => {
        let target = data.find(item => item.name === name)
        if (target) {
            target.active = true
        }
    }

    return (
        <>
            <div>
                <h3 className="text-lg font-medium leading-6 text-gray-100">User Information</h3>
                {/* <p className="mt-1 max-w-2xl text-sm text-gray-500">Personal details and application.</p> */}
            </div>
            <div className="mt-5 border-t border-gray-200">
                <dl className="divide-y divide-gray-200">
                    {userData.map((data, i) =>
                        <div key={i} className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                            <dt className=" font-medium text-green-500">{data.name}</dt>
                            <dd className="mt-1 flex  text-white sm:col-span-2 sm:mt-0">
                                {!show ? <span className="flex-grow">{data.value}</span> :
                                    data.name === item &&
                                    <div>
                                        {/* <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                        Search candidates
                                    </label> */}
                                        <div className="mt-1 flex rounded-md shadow-sm">
                                            <div className="relative flex flex-grow items-stretch focus-within:z-10">
                                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                                    <UsersIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                                </div>
                                                <input
                                                    type="text"
                                                    name="email"
                                                    id="email"
                                                    className="block w-full text-black rounded-none rounded-l-md border-gray-300 pl-10 focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                                    placeholder={data.placeHolder}
                                                />
                                            </div>
                                            <button
                                                onClick={() => {
                                                    data.name === 'Nickname' ? updateUserData((document.getElementById('email') as HTMLInputElement)!.value) :
                                                        data.name === 'Email Address' ? updateUserEmail((document.getElementById('email') as HTMLInputElement)!.value) :
                                                            data.name === 'Password' ? updateUserPassword((document.getElementById('email') as HTMLInputElement)!.value) :
                                                                alert('No valid field detected')
                                                }}
                                                type="button"
                                                className="relative -ml-px inline-flex items-center space-x-2 rounded-r-md border border-gray-300 bg-gray-50 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                                            >
                                                {/* <BarsArrowUpIcon className="h-5 w-5 text-gray-400" aria-hidden="true" /> */}
                                                <span>Save changes</span>
                                            </button>
                                        </div>
                                    </div>
                                }

                                <span className=" flex-shrink-0 ml-auto">
                                    <button
                                        disabled={item === data.name}
                                        onClick={() => {
                                            setItem(data.name); setShow(true)
                                        }}
                                        type="button"
                                        className={` p-2 rounded-md bg-white font-medium text-indigo-600 ${item === data.name ? 'bg-gray-300' : 'hover:text-white hover:bg-indigo-600'}  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2`}
                                    >
                                        Update
                                    </button>
                                </span>
                            </dd>
                        </div>
                    )}
                    {/* 
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className=" font-medium text-green-500">Email address</dt>
                        <dd className="mt-1 flex text-white sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">{user.email}</span>
                            <UpdateButton />

                        </dd>
                    </div>

                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className=" font-medium text-green-500">Password</dt>
                        <dd className="mt-1 flex  text-white sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">*********</span>
                            <UpdateButton />

                        </dd>
                    </div> */}

                    {/* <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">About</dt>
                        <dd className="mt-1 flex text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <span className="flex-grow">
                                Fugiat ipsum ipsum deserunt culpa aute sint do nostrud anim incididunt cillum culpa consequat. Excepteur
                                qui ipsum aliquip consequat sint. Sit id mollit nulla mollit nostrud in ea officia proident. Irure
                                nostrud pariatur mollit ad adipisicing reprehenderit deserunt qui eu.
                            </span>
                            <span className="ml-4 flex-shrink-0">
                                <button
                                    type="button"
                                    className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                >
                                    Update
                                </button>
                            </span>
                        </dd>
                    </div>
                    <div className="py-4 sm:grid sm:grid-cols-3 sm:gap-4 sm:py-5">
                        <dt className="text-sm font-medium text-gray-500">Attachments</dt>
                        <dd className="mt-1 text-sm text-gray-900 sm:col-span-2 sm:mt-0">
                            <ul role="list" className="divide-y divide-gray-200 rounded-md border border-gray-200">
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">resume_back_end_developer.pdf</span>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>
                                        <span className="text-gray-300" aria-hidden="true">
                                            |
                                        </span>
                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                                <li className="flex items-center justify-between py-3 pl-3 pr-4 text-sm">
                                    <div className="flex w-0 flex-1 items-center">
                                        <PaperClipIcon className="h-5 w-5 flex-shrink-0 text-gray-400" aria-hidden="true" />
                                        <span className="ml-2 w-0 flex-1 truncate">coverletter_back_end_developer.pdf</span>
                                    </div>
                                    <div className="ml-4 flex flex-shrink-0 space-x-4">
                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Update
                                        </button>
                                        <span className="text-gray-300" aria-hidden="true">
                                            |
                                        </span>
                                        <button
                                            type="button"
                                            className="rounded-md bg-white font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                                        >
                                            Remove
                                        </button>
                                    </div>
                                </li>
                            </ul>
                        </dd>
                    </div> */}
                </dl>
            </div>
        </>
    )
}
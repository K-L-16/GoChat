import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import personIcon from '../assets/person.png'
import logoBig from '../assets/logo-big.png'
import { AuthContext } from "../../context/AuthContext"
import arrowIcon from '../assets/arrow.png'





export default function ProfilePage() {

    const {authUser, updateProfile} = useContext(AuthContext)

    const [selectImg, setselectImg] = useState(null)
    const navigate = useNavigate();
    const [name, setName] = useState(authUser.fullName)
    const [bio, setBio] = useState(authUser.bio)

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!selectImg) { //no image
            await updateProfile({ fullName: name, bio })
            navigate('/')
            return
        }

        const reader = new FileReader();
        reader.readAsDataURL(selectImg);
        reader.onload = async () => {
            const base64Image = reader.result;
            await updateProfile({ profilePic: base64Image, fullName: name, bio })
            navigate('/');
        }
        
    }

    return (
        <div className="min-h-screen bg-[#393939] flex items-center justify-center px-4">
            <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-lg border border-gray-100
    flex items-center justify-between max-sm:flex-col-reverse">
                
                <button
                    type="button"
                    onClick={() => navigate('/')}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white shadow-sm
             hover:bg-gray-100 active:scale-95 transition "
                >
                    <img src={arrowIcon} alt="Back" className="w-4 h-4 filter brightness-0" />
                </button>


                <form
                    onSubmit={handleSubmit}
                    className="flex flex-col gap-5 p-10 flex-1 text-slate-900"
                >


                    <h3 className="text-xl font-semibold">Profile</h3>

                    <label htmlFor="avatar" className="flex items-center gap-3 cursor-pointer text-sm text-gray-600">
                        <input onChange={(e)=>setselectImg(e.target.files[0])} type="file" id="avatar" accept=".png, .jpg, .jpeg" hidden />
                        <img src={selectImg ? URL.createObjectURL(selectImg) : personIcon} alt="" className={`w-12 h-12 border-black${selectImg && 'rounded-full'}`} />
                        upload profile image
                    </label>
                    <input
                        type="text"
                        required
                        placeholder="Your name"
                        onChange={(e) => setName(e.target.value)}
                        value={name}
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm"
                    />
                    <textarea
                        rows={4}
                        placeholder="..."
                        onChange={(e) => setBio(e.target.value)}
                        value={bio}
                        className="p-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-violet-500 text-sm resize-none"
                    />
                    <button
                        type="submit"
                        className="mt-2 w-full flex items-center justify-center
    rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500
    text-white text-sm font-semibold tracking-wide
    py-2.5 shadow-md shadow-violet-200
    hover:shadow-lg hover:brightness-110 active:scale-[0.98]
    transition-all duration-150 cursor-pointer"
                    >
                        Save
                    </button>

                </form>
                <img
                    src={authUser?.profilePic || logoBig}
                    alt=""
                    className={`w-40 h-40 object-cover rounded-2xl mx-10 max-sm:mt-6 ${selectImg && 'rounded-full'}`}
                />

            </div>
            
        </div>
    )
}
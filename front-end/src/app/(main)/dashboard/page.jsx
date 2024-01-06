import { HomeIcon } from '@heroicons/react/24/solid';
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import TextBox from "../../../components/TextBox"
import ThemeSwitcher from "../../../components/ThemeSwitcher"
import SideNav from "../../../components/SideNav"
import OptionsMenu from "../../../components/OptionsMenu"
import HypothesisBox from "../../../components/HypothesisBox";
import InsightsBox from "../../../components/InsightsBox";
import DocumentTitle from '../../../components/DocumentTitle';
import ToggleButton from '../../../components/ToggleButton';
import NavBar from '../../../components/NavBar';
import '../../../app/globals.css'

export default async function page() {
    const session = await getServerSession(authOptions);       
    if (!session) {
        redirect('/login');
    }
    return (
    <div className="grid grid-rows-[auto_1fr] grid-cols-5 w-screen h-screen bg-bgGrey delayAnimation transition-colors duration-500 ease-in-out dark:bg-neutral-900">
        {/* <!-- This is the first item at the top-left corner spanning 2 columns --> /} */}
        <div className="col-span-5 md:col-span-5 pb-2">
            {/* put the home icon and drop down menu here */}
            <div className="flex flex-row justify-between items-center w-full">
                <NavBar sessionId={session.sessionId}/>
            </div>
        </div>

        {/* <!-- TextBox should span the entire height minus the first row and span all columns --> /} */}
        <div className="flex flex-col col-span-5 md:col-span-3 pt-4 h-full overflow-y-auto">
            <TextBox sessionId={session.sessionId}/>
        </div>

        <div className="hidden md:flex md:flex-col md:col-span-2 pt-4">
            <div className="w-full overflow-y-auto">
                <HypothesisBox sessionId={session.sessionId}/>
            </div>
            <div className="w-full py-8 overflow-y-auto">
                <InsightsBox sessionId={session.sessionId}/>
            </div>
        </div>
    </div>
    )
}

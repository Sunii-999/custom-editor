import {Editor} from "./editor"
import {Toolbar} from "./toolbar"
import {Navbar} from "./navbar"
import { Room } from "./room";


interface DocumentIdPageProps {
    params: Promise<{ documentId: string}>;
}

const DocumentPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params
    console.log(documentId)


    return ( 
        <div className="min-h-screen bg-[#202124]">
            <div className="flex flex-col px-4 pt-2 gap-y-2 fixed top-0 left-0 right-0 z-10 bg-[#202124] print:hidden">
                <Navbar />
                <Toolbar/>
            </div>
            <div className="pt-[140px] print:pt-0 ">
                <Room>
                    <Editor/>
                </Room>
            </div>
        </div> 
        );
    }
 
export default DocumentPage;
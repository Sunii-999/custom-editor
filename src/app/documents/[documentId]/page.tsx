import {Editor} from "./editor"

interface DocumentIdPageProps {
    params: Promise<{ documentId: string}>;
}

const DocumentPage = async ({params}: DocumentIdPageProps) => {
    const {documentId} = await params

    return ( 
        <div>
            Document Id: {documentId}
            <Editor/>
        </div> );
    }
 
export default DocumentPage;
import React, { useState } from "react"

export function BookUpload(props) {

    const [file, setFile] = useState(undefined);
    const [result, setResult] = useState(undefined);

    let handleFileUpload = (event) => {
        setFile(event.target.files[0]);
    }

    let onSubmit = (event) => {
        event.preventDefault();
        if (file !== undefined) {
            props.apiService.uploadFile(file).then((response) => {
                setResult(response.message);
            });
        }
    }

    return (
        <div>
            <form onSubmit={onSubmit}>
                <input type="file" id="data_file" onChange={handleFileUpload} />
                <input type="submit" value="Upload" />
            </form>

            {result !== undefined && 
                <p>{result}</p>
            }
        </div>
    )
}

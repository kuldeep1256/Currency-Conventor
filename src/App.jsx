import Currency from "./Components/Currency";

function App(){
    return(
        <>

        <div className="min-h-screen bg-white flex flex-col items-center justify-center border-4 border-black rounded-lg p-8 "
                style={{
                    backgroundImage: "url('https://plus.unsplash.com/premium_photo-1661962769667-a159071a31cd?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZHViYWklMjBuaWdodCUyMHZpZXd8ZW58MHx8MHx8fDA%3D')", // Replace with your desired image URL
                    backgroundSize: "cover", // Cover the entire div
                    backgroundPosition: "center", // Center the image
                  }}
          
        >
            <div className="container">
            <Currency/>
            </div>
            


        </div>
        </>
    )
}export default App;
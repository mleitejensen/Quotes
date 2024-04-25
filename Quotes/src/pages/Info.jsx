import homePNG from "../assets/home.png"
import homePostPNG from "../assets/home-post.png"
import homeDeletePNG from "../assets/home-delete.png"
import homeEditPNG from "../assets/home-edit.png"

const Info = () => {



    return(
        <div className="info">
            <h2>How do i make a new post?</h2>
            <img src={homePNG} alt="Image of your home page"></img>

            <p>On the image over you can see your home page. <br/> This is where you can make new post.</p>

            <p>To make a new post, just write a quote in the big text box and write who said it in the "origin" input field. After you have writen what you want, you just have to hit the "publish" button and then your are done. Look at the image below for more help.</p>
            <img src={homePostPNG} alt="Image of how to make a new post" />

            <h2>How do i delete a post?</h2>
            <p>Deleting a post must also be done at your home page. <br/>If you have any post, they should appear under the publish box. Each of your posts should have a button that says "X". Simply click that button on the post you want to delete and you will be asked to confirm. Look at the image below for more help.</p>
            <img src={homeDeletePNG} alt="Image of how to delete a post" />

            <h2>How do i edit a post?</h2>
            <p>To edit a post go to your home page and click on any of your posts. They are all marked with a dashed underline. On the image below you can see i am editing my newest post.</p>
            <p>When you are done editing you post, click the "Save edit" button to apply it. If you changed you mind and dont want to edit your post, click the "Cancel edit" button.</p>
            <img src={homeEditPNG} alt="Image of how to edit a post" />
            
        </div>
    )


}

export default Info
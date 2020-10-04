import React from 'react';
import './Home.css';

export default function Home(){
    return (
    <div>  
        <div class='columns'>
            <div class='column' style={{padding: '0'}}>
                {/* <h2 style={{textAlign: 'center', fontWeight: 'bold',fontSize: '1.5rem', padding: '25px', marginTop: '25px'}}>Achieving Above Normal Readiness</h2> */}
                <div style={{backgroundColor: 'rgb(12, 56, 106)', boxShadow: '1px 1px 10px 1px rgba(10,10,10,1)', borderRadius: '2px', padding: '20px'}}>
                    <h2 style={{textAlign: 'center', fontWeight: 'bold', color: 'rgba(255,255,255,0.8', paddingTop: '25px'}}>Achieving Above Normal Readiness</h2>
                    <h3 style={{display: 'flex', justifyContent: 'space-around'}}><span>Q&A Support</span><span>|</span><span>Documentation</span><span>|</span><span>Community</span></h3>
                </div>
                <hr style={{width: '30%', marginLeft: '35%', height: '2px', opacity: '0.1', border: 'none', marginBottom: '0'}} />
            </div>
        </div>

        <div class="columns">
            <div class="column is-one-third">
                <img src='images/code.jpg' alt='picture of an instructor and student on video chat'/>
            </div>
            <div class="column">
                <h4>Tailored Q&A Support</h4><br />
                {/* <p>How many times have we all been there?...You want to add a simple feature to your app. Hours later, you have 30 browser tabs open that cover a range of cryptic documentation and endless hour-long youtube tutorials that kinda relate to what you want to do but also it's from 5 years ago so you tried it 8 different ways and it still doesn't work...and now your brain doesn't want to be creative any more...</p> */}
                <p>Stop spending hours in the youtube tutorial black hole. DevCon4's new interface is user-friendly, hacking the distance between you and senior engineers who want to help.</p><br/>
                <p>Post your question, get tailored support. It's that easy...</p>
            </div>
        </div>
        <div class="columns" style={{backgroundColor: 'rgb(12, 56, 106)'}}>
            <div class="column">
                <img src='images/docs.png' alt='picture of programming languages'></img>
            </div>
            <div class="column is-two-thirds">
                <h4 style={{color: 'rgba(255, 255, 255, 0.9)'}}>Reference/Training Materials</h4><br />
                <p style={{color: 'rgba(255, 255, 255, 0.9)'}}>
                Just getting started? Or need inspiration to jump into new technologies/tools? The DevCon4 community has re-imagined dev docs to inspire your next project. Search or browse top-rated user pages for grassroots documentation built by our community. 
                </p>
            </div>
        </div>
        <div class="columns">
            <div class="column is-one-third">
                <img src='images/community.jpg' alt='picture of team of developers working together around a table'></img>
            </div>
            <div class="column">
                <h4>Community</h4><br />
                <p>Perhaps most exciting of all is the brilliant community of developers that call D4 home. Whether you are a junior dev seeking to learn, a senior dev looking to give back, or anyone trying to find some solid documentation for your new project, you'll find everything you need right here. </p>
            </div>
        </div>

          {/* <video src='videos/typing.mp4' autoplay controls width="250"></video> */}
    </div>
    )
}
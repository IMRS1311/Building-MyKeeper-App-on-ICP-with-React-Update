How to Configure a DFX Created Project to Use React:
=====================================================
=====================================================
How to build an application on the ICP with an actual proper React frontend.

In this module is we're going to take that Keeper app which we built using React in the React module of the course where you built it completely from scratch.
And essentially it mimics the Google Keep functionality. So you can take some notes, you can add a title and go ahead and add it to your Google keep or your keeper in this case.

This keeper App has been built using just React, so we basically only had the frontend for this application without a backend or database, that means this application, when you refresh it, everything disappears and gets reset to the beginning, which is not great if you actually want to be able to keep hold of your notes.

So, we're going to add an ICP backend and data persistence and storage for this application to make it fully featured and also decentralized on the Internet computer blockchain.
Following are the steps to be followed to get the ICP app to be able to use React. And those steps based on that you have installed the latest versions of Ubuntu, DFX and the latest stable version of NodeJS. It is going to be a bit complicated than the previous versions but more stable and compatible with no unexpected errors:

1. Create a new ICP application, just as we did before. So inside ic-projects we're going to create our new dfx project: dfx new mykeeper and hit Enter.
2. Then respond to the multi-selection queries as following:
    ? Select a backend language: > Motoko
    ? Select a frontend framework: › React
    ? Add extra features (space to select, enter to confirm) › Frontend tests

3. Hit Enter and once you see the Dfinity logo, then you are done.
4. Now inside VSCode, cd to the new mykeeper application and we're going to have to do a few things to modify it so that it can actually run our React application. So go ahead and expand src folder. And then inside it, there are two other folders:
    mykeeper_backend, which is where we have our Motoko file main.mo.
    mykeeper_frontend, you've got the index.html, the public folder and the src folder that includes the js, jsx and scss files.
5. So we're going to replace the contents of index.scss file, the index.html. App.jsx file and also the main.jsx with files from your keeper-App as following:
    Make sure to keep the location of all files in the created hierarchy intact to avoid functioning errors.
    Delete all the contents of index.scss file and replace it with the contents of styles.css from your keeper-App.
    Delete all the contents of main.jsx file and replace it with the following:
   <!-- 
   import React from 'react';
   import { createRoot } from "react-dom/client";
   import App from './App';
   import './index.scss';

    const rootElement = document.getElementById("root");
    const root = createRoot(rootElement);

    root.render(
    <React.StrictMode>
    <App />
    </React.StrictMode>,
    ); 
    -->
 Delete all the contents of index.html file and replace it with the contents of index.html from your keeper-App. Change the title to your new title (My Keeper), remove the link of the styles.css since it is imported by the main.jsx file from index.scss as above indicated. also make sure to put this line at the bottom of the body element:

  <!-- 
  <script type="module" src="/src/main.jsx"></script>
  -->

 Copy the Components folder from your keeper-App and paste it inside the src folder
 Delete all the contents of App.jsx file and replace it with the contents of App.jsx from keeper-App. And make sure to modify the import statements to reflect the correct directories of Components folder files if needed. 6. Now we have mykeeper_frontend that includes index.html file, public folder and src folder. Src folder includes Components folder, App.jsx file, index.scss file and main.jsx file. And now we've basically moved our entire React frontend over to our mykeeper project. So we've created a new ICP project on the command line, we've downloaded our files, we dragged them into their proper places as above indicated and now we have to go ahead and update some of these files and change some of the contents.

7. Now the final thing we have to do before we run our frontend is to go into the mykeeper_frontend /package.json, go ahead and modify the contents by adding lines from the Keeper-App package.json file that do not exist in mykeeper package.json. Those are mainly the "dependencies" and "browserslist" elements. So, now let's hit save and we are finally ready to actually test out our frontend and see if it actually works on local host.

So let's open up a new terminal and let's use our dfx start to start the simulated local ICP blockchain.
And then once that's done, let's go ahead and open up another panel of our terminal and run npm install and this is going to install the required dependencies that we've specified in the mykeeper_frontend /package.json. And if we go ahead and hit enter, it should take a little while and do that for us.

Now, go ahead and run dfx deploy and deploy our canisters onto the simulated ICP network.
Finally, when your canisters have been deployed, you can go ahead and run npm start and go to browser and go to our localhost that has been defined in the terminal and it is in my case http://localhost:3000/, and you can see the front end of our React application is now up and running.

But this has no backend and it's got no sort of Motoko code or nothing really that we've done for it on the ICP side.

But it's just to prove that our frontend has actually been linked up correctly and that we can actually get it hosted locally.

So if you add any new note, you can see this gets added, and you can see that everything is working fine. But if you hit refresh, everything gets deleted because there is no backend there and there is no storage.

So we have to be link this up with our main.mo so that we can persist the data typed in the browser and store them on the internet computer blockchain.



Storing Data on a Canister:
==============================
==============================
-	Go to Motoko file main.mo inside mykeeper_backend.
-	Delete the Hello code, which is just there from the template.
-	Create an actor, which is our canister and call it for example Mykeeper.
-	Inside Mykeeper actor, create a new data type Note to represent the kind of data that will be stored in each of these notes (title and content) as per our mykeeper App requirements and as we have already defined in the frontend:
<!-- 
actor Mykeeper {
 public type Note = {
    title: Text;
    content: Text;
  };
  -->
Notice that both “title” and “content” are going to be of type Text.
Also do not forget to close the curly braces with a semicolon. 
The syntax is a little bit different from JavaScript but similar to the way of creating objects.
It is required to add the keyword public in front of type because we need to access type from the JavaScript side.
This way when we're writing our code in our main.jsx or inside our Components, we'll be able to see this data type and be able to use it there as well.
-	Create our new variable notes. And this variable is going to have a data type of a List, which is kind of similar to the Arrays that we've been working with in JavaScript, but also a little bit different. And we'll point out the differences later on. The List is going to contain Note type. So to specify that in this data type, we have to write it this way:

<!-- 
var notes: List.List<Note> = List.nil<Note>();
 -->

And because we're going to start it off as an empty list, so we'll just say it is equal to:
<!-- 
List.nil<Note>();
-->
-	Now you'll see a red underline here saying unbound variable list and this is because in order to use some of its functionality, so if we use list dot something, we're no longer using it as a type, but we're using some of its methods. So we have to import it basically:  <!-- import List "mo:base/List"; --> and now you can see those errors disappear.
So here we've basically created the equivalent of an array of Note objects, but in this case, it's actually a List that contains objects of type Note.
-	Now we're going to create our public function createNote and it's going to allow us to send over some titleText from the JavaScript side when the user enters it into the text field and also send over some contentText:

  <!-- 
  public func createNote(titleText: Text, contentText: Text) { -->


-	And once we've gotten hold of that, then we can create a newNote so we can say let newNote be of type Note:
 <!--  
 public func createNote(titleText: Text, contentText: Text) {
      let newNote: Note = {
      title = titleText;
      content = contentText;
    };
-->

So notice that we've got equal when we created the newNote and when we declared the type, we've got the colons to specify the data type.
Then, we set the title attribute to equal, So a little bit different (in JavaScript when we create a new object we use the colons) just be careful.
We set the title attribute to the titleText that was sent over and the content attribute to the contentText that gets sent over.
And now here we've created our new note from whatever data was added to the input when this method was called from the JavaScript side.

-	And finally, what we have to do is to add this new note to this list of notes:
    notes:= List.push(newNote, notes);
So we're using this push as one function of List method in order to push an item onto the List, we have to specify two things. One is the item that is going to be pushed into the list: newNote, and second is the list that you want to push it on: notes. And we have assigned the new created List to our list notes.

And if you take a look in the dfinity documentation and you go to this List type, you can see that we've used the nil to create an empty List. And we use the push to add the newNote to the List.

And you can see it happens by pre-pending a value. So it's going to get added to the beginning of the list.
And this is a little bit different from how we add to arrays normally where we normally append it, so we add it to the end.
And this is going to come in as very important a little bit later on when we try to organize our various notes inside the mykeeper app.

-	And once we've done that, let's go ahead and add a debug into this. So let's import the debug library.
<!--import Debug "mo:base/Debug"; -->
And use debug.print and then debug_show in order to print out what the notes list actually looks like at this point.
<!-- Debug.print(debug_show(notes)); -->
-	So this is all that we have to do in our main.mo file in order to create a new note:
<!-->
import List "mo:base/List";
import Debug "mo:base/Debug";

actor Mykeeper {
  public type Note = {
    title: Text;
    content: Text;
  };

  var notes: List.List<Note> = List.nil<Note>();
  
  public func createNote(titleText: Text, contentText: Text) {

    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes:= List.push(newNote, notes);
    Debug.print(debug_show(notes));
  }
}
-->
-	Now, we have to link up what we've created in Motoko file with our JavaScript. And where most of the action is happening on the JavaScript side is inside the createNote.jsx.

So if you open it up, you can see there's a function called submitNotes which gets triggered every time the user presses the add button in the browser.
And that's because we created that component called createNote, which is basically this area, and we have an event listener “onClick” on that add button so that when that happens, we trigger this function submitNotes.
And we went into this in a lot of detail when we learned about React. 
So this function is what we're going to have to modify a little bit in order to get this createNote to be triggered and to pass it the things that it needs.
So in order to get hold of anything in the main.mo file, we have to import it into our jsx file:
<!-- import {mykeeper_backend} from "../../../declarations/mykeeper_backend"; -->

Now at the moment, in declarations/mykeeper_backend.did, you'll only see the previous function from when we built this brand new Hello World app, which contained that greet function.
But if we go ahead and run a dfx deploy, it will be able to create the required bridge to allow our JavaScript code to call these Motoko functions.
And you can see that here. We've now got our createNote that takes two text inputs and returns nothing.
So coming back here, we can then access it using our module name.
So inside the submitNotes function, when we're triggering setNotesList basically to update the state of our notes constant, just before we return, we're going to call that function.

So we're going to say:
<!-- mykeeper_backend.createNote(newNote.title, newNote.content) -->
 
And in JavaScript, we're going to have to make sure that the order that we add in the arguments matches with the order that we created in our Motoko side.
So the first thing we add is the title and the next is the content. So in here we're going to tap into this newNote that's created on the frontend. And we're going to tap into, firstly, its newNote.title, and secondly, newNote.content
And the reason why they have these attribute names is because in our createNote, we've defined how the notes are structured and they've got two attributes: title and content. So I'm just keeping it the same everywhere for consistency sake.

So in this case, we're tapping into the title and the content that gets created on the frontend, and I'm sending that over via the createNote back over to Motoko file so that we can create a new note on our backend. And with just those few lines of code, we should have now been able to get this to work.

What is expected to happen is when a new note created and click add, not only does the frontend update because of the used state to update the notes constant to include the new note that was created, but also a print statement to occur somewhere in the terminal to show that that new note has actually been created on the backend as well and this list of notes has been updated.
So, go ahead and save all, run dfx deploy and once you've done that, let's refresh our My Keeper App and let's write a new note (title: Note1, content: My New Note 1) for example, then click add button.

You can see the frontend updates immediately because that's happening through React.
But the most important thing is to make sure our backend actually registered correctly and that this debug.print statement actually got called.

And if you look in here, the terminal where you had the dfx start running, you should see that the canister, so this to mykeeper_backend canister, sent the message where it printed out what is currently inside this notes list and it has the content of this and the title of this which matches exactly with what we typed in there.

Now we've managed to actually get our backend to work and to complete the C aspect of the CRUD, be able to create new items on our backend and store that inside our list, which is called notes.


Retrieving Data from a Canister:
================================
================================
Now that we've managed to create a note and be able to add it to our backend, the next step is to be able to take these notes that we've stored and be able to serve it back up onto the front end.

So, in our Motoko main.mo file we will create a new public query function to be able to read the List of notes that has been stored in the backend canister.
This function readNotes is going to accept any inputs, but it is going to return asynchronously and going to give us not a list of notes, but actually an array of notes.
So an array is another object in Motoko code that we can use, and structurally it's a lot more similar to the arrays that we've got in JavaScript.
If we return an array of notes, then we'll be able to work with it much more easily when we get hold of it in our JavaScript.
Now, why are we storing it as a List, though?
Because in a lot of the operations we're doing, when we're pushing newNote onto it or when we're finding a note to delete later on, working with something that's an array which is serialized is not very efficient on the blockchain.

So when we're reading it, we're going to get hold of our List to return our notes, but we're going to convert it into an array using a function from our list documentation which is called toArray, and this will convert a list to an array.

That's what we're going to use. We're going to say List.toAarray. And this takes just one argument, which is the list that you want to convert, and it's going to return it in the format of an array:

  <!-- 
  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  }; 
  -->

So the Motoko side is pretty simple, but now we have to address how do we get hold of it when our page loads up?
Because when we add a newNote, the setNotesList method makes sure that this notes constant is updated.

And because we're using the useState hook, that means whenever it's updated, it's going to re-render the screen and be able to draw on the newNote that was created.
But now how do we tap into the moment when the first render is done, when our website first loads up?
Well, in order to do that, we have to use another React hook. And this is called the useEffect hook. useEffect is triggered every time the render function gets called in React.

So every time the React component re-renders. So in this case, it's the App component.
And of course that means the first time when the website is rendered to be displayed, it will also be triggered.

This function useEffect takes two parameters.
The first parameter is the function that should be called whenever the re-rendering happens.
Inside our useEffect, we're going to call a function that we're going to create, which is going to be called fetchData().
And the reason why I'm splitting out this fetchData is because this fetchData has to be asynchronous and useEffect can't really be turned into an asynchronous function itself.

  <!-- 
  useEffect(() => {
      console.log("useEffect is triggered");
      fetchData();
  }); 
  -->

Let's create this async function fetchData. And let's make it get hold of our data from our Motoko code. So we're going to tap into our mykeeper_backend canister and we're going to call that method that we created there called readNotes.

And this then should be able to return us that array which we can store in a local constant, which we can call the notesArray. Because this is going to be returned asynchronously, we have to wait on it. So we have to add the await keyword in front of this method call so that we wait for this to come back before we continue:
<!-- 
async function fetchData() {
    const notesArray = await mykeeper_backend.readNotes();
    setNotesList(notesArray);
} 
-->

Now, whenever our window loads, it's going to trigger the console.log but also our fetchData. And then this method is going to wait until it gets that array back.
And once it gets it though, we want to be able to update our notes using the update method setNotesList.
So just below this constant, I'm going to say setNotesList.

And inside I'm just going to say set everything to the new objects inside the notesArray. And that is going to trigger a re-render because our state updated. So you can imagine that we could get ourselves very quickly into an infinite loop.
Because we have setNotesList which is going to update the state of our nodes constant, which then is going to trigger a rerender of our app React component.
And as we mention, every time the app component gets re-rendered, it triggers the useEffect.

So this could go on forever and we can see this happening when we console.log.

If we go ahead and run dfx deploy, you can see that useEffect is triggered many times.
And when we want to add a newNote, you can see that it sort of works but useEffect is triggered so many times because it's in this endless loop.

So what we need to know is that the useEffect hook actually has a second parameter, and the second parameter is an array where we can specify a particular prop or some sort of variable which it checks to see if it's changed before it triggers the function in useEffect.
So we can use this second parameter to prevent the useEffect from triggering more than once by putting in an empty array.
And this will ensure that useEffect will run only once.

So after this first argument which is our function, we're going to add a comma and add an empty array so that it stops once this has completed once, which is all we want because we only want this to happen when the re-render or when the website reloads:
<!-- 
useEffect(() => {
    console.log("useEffect is triggered");
    fetchData();
}, []); 
-->

So now let's hit save. Let's go back to our My Keeper app and you can see that useEffect is triggered once.
But if we go ahead and take a note and click add, you can see the note is added in there. But now because these notes are created on the front end and persisted on the backend, if we hit reload, they don't disappear because they're being read from our Motoko backend on the blockchain and they're being pulled out each time we reload.
You can write as many notes as you want, and now they'll actually stay on the screen. 

Now, there's just one thing that you might have noticed, which is the order the notes go in. So if I go ahead and add note5 which will be the latest note, if I click add, you see it gets added at the end.
But then when I click refresh, because of the way our push function works by pre-pending a value, so the new value gets added to the beginning of the list, then it kind of messes up the order every time we refresh.

So how can we fix this?
The only thing we have to change then is when we add it to the frontend, remember that it updates because setNotesList triggers an update in the state.

And here we're saying let's get hold of the previous notes and let's create this newNote and we're taking the newNote and adding it to the end of all of the previous notes.

So if we just simply reverse this array, so we say, let's add the new note to the beginning, and then we'll add the previous notes at the end, then we're going to get a different order:

<!-- 
setNotesList(prevList => {
    mykeeper_backend.createNote(newNote.title, newNote.content)
    return [newNote, ...prevList];
    }); 
-->

So if we hit save, we go back and we add a new note, we'll call it Note 2 and click add you can see it now gets added to the very beginning. And if we refresh our website, nothing happens. 
None of the orders change and it works as we would expect it to. 


Deleting and Persistence:
==========================
==========================
You can delete notes on the frontend but as soon as you hit refresh and we pull in all of our notes from the blockchain, it restores the deleted note.
Notice in createNote.jsx, we've got the deleteListNote function and all it does at the moment is it updates our constant notes using the setNotesList method to filter through all of the notes and check for the one that has the index that's selected and then basically get rid of it from the previous notes.

That is why frontend appears to work, but we need to link it up with our main.mo so that when we actually hit refresh and we pull in these notes that it actually persists.

If you look through the documentation as of right now, there actually isn't a utility function for the list in Motoko that allows us to just remove a List item based on its index. So we have to figure out how to do it using the available methods.

Actually we have to build the removeNote function as simple as we can. So, in our solution we are not going to use any method to pull out or delete any item from the backend List. But we are going to use some workaround to take the notes array after filtering out the deleted item and assign it to a new variable newList. Then, we pull the newList array from the frontend to our backend main.mo where we convert it to List and assign it to our notes List. By this way we replace our backend notes List with a new List generated from the newList array that doesn’t include the deleted item.

In this case when we fetch the data from the backend and render it to the browser through our useEffect function, we will use the updated notes List that doesn’t include the deleted item.

So, in order to do that we will do two parts:
First part: in our backend main.mo:
-	Inside our actor Mykeeper, create a new  public data type array that includes the Note data type earlier created:
<!-- 
public type MyArray = [Note]; 
-->

-	Create public removeNote function that will take one input newList of a type MyArray. Inside this function convert the newList array to List and assign it to our notes List. Then use Debug.print to observe the updated notes List in the Terminal:
<!-- 
public func removeNote(newList: MyArray) {

  notes:= List.fromArray(newList);
  Debug.print(debug_show(notes));

        // To observe the length of the updated notes List
  var myListSize: Nat= List.size(notes);
  Debug.print(debug_show(myListSize));
}; 
-->
Second part: in our frontend Note.jsx component:
-	Import mykeeper_backend from backend declarations:
<!-- 
import {mykeeper_backend} from "../../../declarations/mykeeper_backend"; 
-->

-	Inside the Notes function and under the deleteNote function create a new const and assign to it the notes array sent as a prop from createNote.jsx component. You can console.log it for verification:
<!-- 
const newList = props.notes;
console.log(newList); 
-->

-	Call the removeNote function from main.mo in mykeeper_backend and assign the newList array as input:
    mykeeper_backend.removeNote(newList);
-	Save all and test the work by dfx start then dfx deploy and npm start in a second terminal window. Create new note in the browser, try to delete one of the notes and observe the terminal to make sure that the deletion has been persisted in the backend as well as in the frontend.


Notes:
=========
In Motoko, The structure of a list is different from an array, because when we add it using push It actually got added to the beginning, so pre-pended to our list. But also it doesn't look like a list because they're not within the same hierarchical level.
In fact, it's almost like we've got an array that has many layers of embedding, and that's why we had to convert it into an array before we send it over to our JavaScript so that we can actually convert it out of this embedding format as seen in the terminal into a format that can be easily understood by the JavaScript.

And also we convert the array sent from frontend JavaScript to an impeded List format that can be easily understood by Motoko.

Alternative Solution:
=====================
=====================
So the first thing we said we're going to do is we're going to take our list, which is our notes, and we're going to take the number of items that correspond to the ID that we want to remove.

To do that, we're going to use the List.take. Notice previously

every time we use the method from the list type, we've always had to use List.take and this List.take expects two arguments: one is the list you want to take from, second is a natural number that corresponds to how many items you want to take from it, so the n. Our list is notes and we want to take the index using this ID that we get passed.
Then I'm going to set it to equal a constant, which I'll call listFront because this will be the new beginning of our list.

And then I'm going to create a listBack which is going to be created using list.drop.
So we're going to drop the list notes and we're going to drop the number that corresponds to the id that we get + 1.

If this doesn't make sense to you, then just simply try it out.
Try it out using that playground and see what you actually get to be able to understand it.
But basically we're going through this three step process in order to remove an item when we're sent the index of that item to remove.
The final step is we're going to reset our notes so using that := sign, we're going to set it to the List.append and we're going to append the listFront to the listBack.

<!-- 
public func removeNote(id: Nat) {
  // take drop append
  let listFront = List.take(notes, id);    // Takes items preceding the item with index id.
  let listBack = List.drop(notes, id + 1); // Drops items including the item with index id.
  notes := List.append(listFront, listBack);

  Debug.print(debug_show(notes));
}; 
-->
In this solution we will not need any relevant code in the Note.jsx component. So, we will comment them out since they are relating to the other alternative solution:

<!-- 
// import {mykeeper_backend} from "../../../declarations/mykeeper_backend";

    // const newList = props.notes;
    // console.log(newList);
    // mykeeper_backend.removeNote(newList); 
-->

And now through these three lines of code which you could if you want to simplify, but I think it's easier to understand it when we split it out, then we achieve this remove at index functionality.
So we send the index and we use that index to update our notes to exclude that item by going through this take and drop process.
And once we've done that, then we have to go back to our createNote.jsx and we're going to leave the setNotesList as it is because that's just going to handle the frontend and make things happen immediately.
But in addition, we're going to tap into our mykeeper-backend and we're going to call that method that we created just now, which is removeNote and we have to parse it the value of the id that we get in this function.

Remember, that id comes from the index, which is indexed to correspond to the note that we want to delete.
Finally, let's just cap that off and hit save and let's deploy our canister again.

Once that's done, let's head back over to refresh our My Keeper app.
And because we've redeployed our canister, our notes have been cleared. So let's create our first note.

Notice that it appears. And then. Now let's add another note.
And now I'm going to delete this first one so it immediately disappears. And that is because of these lines of code.

But then if I refresh, notice how it doesn't reappear. And that's because we're pulling it using the fetchData, this removeNote at id has already removed the deleted note so that when we query for the list again, then it doesn't show up in there.
And this way we've managed to implement the backend for our My Keeper to be able to add notes, to be able to view them and have them persist, at least as long as we don't reset our backend.
And then to be able to delete them when we don't want them anymore and for that to persist as well.

Now, there's one final thing:
=============================
As you noticed, whenever I deploy or whenever I upgrade my canister, my notes get cleared. And we can show that by updating something in the code. Because remember, when you hit deploy and your code actually stays the same, it doesn't actually reset the code.

So let's just go ahead and add a Debug.print to add an inconsequential line of code. Now because this has updated the code of our main.mo, if I go ahead and run dfx deploy, then it's actually going to force this code to upgrade our canister which means this note's variable gets emptied out and gets to start from the beginning.
So now if I go back to my localhost, I hit refresh, you'll notice that all the notes will disappear.
But we have one trick up our sleeve, and you've got it. It's that stable keyword.
By turning notes into a stable variable, our list now persists across upgrades, which means that we've basically got a permanent storage solution for our mykeeper app:

<!-- 
stable var notes: List.List<Note> = List.nil<Note>(); 
-->

And now not only do we have a backend, because if I go ahead and hit deploy and I hit refresh, firstly they don't disappear because we've got that storage on our backend.
But now if I go into my main.mo, I change the code significantly. So delete that line for debug or add a line for debug, basically either way forcing it to update my canister when I do dfx deploy.

So even though everything has now been upgraded and this code has now been refreshed, it doesn't matter because if I go back once it's done and I hit refresh, all my notes are persisted. It's as if I have a database in the backend, but I didn't really have to do anything other than add that one stable keyword.

And that's something I think is super fantastic and really interesting.
It really means that we don't have to think so much about databases and getting things in and out. And this is a really incredible way of writing code and creating applications.

So I hope you enjoyed building this to mykeeper app and taking the React frontend to combine it with internet computer blockchain-based backend and now being able to persist this.

So the main takeaways from this module was to show you how you can actually create apps writing Motoko on the ICP blockchain, but also incorporate beautiful advanced frontend, whatever it is you want to do on the frontend using React, thus being able to take our web3 applications really into the future and to be able to make it look as beautiful as any web2 application while retaining the power of an application that runs on the blockchain.


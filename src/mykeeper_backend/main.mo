import List "mo:base/List";
import Debug "mo:base/Debug";
import Nat "mo:base/Nat";
import Array "mo:base/Array";

actor Mykeeper {
  public type Note = {
    title: Text;
    content: Text;
  };

  stable var notes: List.List<Note> = List.nil<Note>();

  public func createNote(titleText: Text, contentText: Text) {

    let newNote: Note = {
      title = titleText;
      content = contentText;
    };

    notes:= List.push(newNote, notes);

    Debug.print(debug_show(notes));
    var myListSize: Nat= List.size(notes);
    Debug.print(debug_show(myListSize));
  };

  public query func readNotes(): async [Note] {
    return List.toArray(notes);
  };

  public type MyArray = [Note];
  
  public func removeNote(newList: MyArray) {

    notes:= List.fromArray(newList);
    Debug.print(debug_show(notes));

    // To observe the length of the updated notes List
    var myListSize: Nat= List.size(notes);
    Debug.print(debug_show(myListSize));
  };

  // Alternative Solution:
  // public func removeNote(id: Nat) {
  //   // take drop append
  //   let listFront = List.take(notes, id);    // Takes items preceeding the frontend item indexed id.
  //   let listBack = List.drop(notes, id + 1); // Drops items including the frontend item indexed id and keeps the rest.
  //   notes := List.append(listFront, listBack);

  // };
  
}



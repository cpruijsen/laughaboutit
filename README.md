# master
laugh about it app

# Trello: https://trello.com/b/knHHVpIB/labitapp

## iOS README 
to get the project running, install XCode
`npm install` both inside the iOS folder and in the main folder.
install `rnpm` and `Cocoapods`
Cmd+B to build in XCode, Cmd+R to start the simulator in Xcode
Recommended not to mess with the info.plist, or any .h / .m files unless you need to add a dependency manually.
 
## unused components
I made a start on several components that in the end were not included in the app (lacking backend endpoints, time for polish, etc).

These include:
- UserProfile - which can be used as a generic component to display user profiles 
(users need to be listed with avatar on cards still)

- Settings - to change user settings in the DB via PUT / POST

- SubmitPhoto - so users can submit camera roll / camera pics to the DB for inclusion in daily caption rounds

- Digits - for SMS login 
(sms are sent to users, but there is an open ticket I filed with the npm module creator about a freeze after the SMS are sent - no answer in a week...)

- there are a bunch of TODOs throughout the code, giving pointers as to where more work can be done
- Trello has a list of suggested additions/changes and bug mentions

- Styling is quite lacking, we know - yay opportunity for Legacy!

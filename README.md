# text-to-calendar
## Text to Calendar
*A Google Apps Script for quickly creating Google calendar events from text messages*

  Several years ago [this](http://www.paulgraham.com/addiction.html) inspired me to revert back to a flip phone.  Although still happy with my decision, I often still long to be able to add events to my Google calendar from my phone.  Thus, the idea for Text to Calendar (TtC) was born.

  TtC is a simple Google Apps Script that allows the user to quickly make Google Calendar events simply by texting his/her email.  After installation is complete, one can create calendar events by texting one's email with a simple formula.  
1. Type cal (case does not matter).  
2. Include optional date and time arguments (see examples below). 
3. Add optional alert arguments (see examples below). 
4. Add a title.  
5. Send your event to your gmail address and you should get a message confirming the event shortly.
  
  ### Examples:
  **Time Arguments:**
  - cal My Event - creates an all-day event tomorrow with the title "My Event" 
  - cal 3 My Event - creates an all-day event 3 days from now with the title "My Event" 
  - cal 8 15 My Event - creates an all-day event next August 15th with the title "My Event" 
  - cal 8 15 9 My Event - creates a 1 hour event beginning at 9am next August 15th with the title "My Event" 
  - cal 8 15 9 14 My Event - creates an event beginning at 9am and ending at 2pm next August 15th with the title "My Event" 
  - cal 8 15 9 15 14 My Event - creates an event beginning at 9:15am and ending at 2pm next August 15th with the title "My Event" 
  - cal 8 15 9 15 14 40 My Event - creates an event beginning at 9:15am and ending at 2:40pm next August 15th with the title "My Event" 

**Alert Arguments:**
- cal 8 15 15m My Event - an alert for this event will be emailed fifteen minutes prior
- cal 8 15 3h My Event - an alert for this event will be emailed three hours prior
- cal 8 15 2d My Event - an alert for this event will be emailed two days prior
- cal 8 15 1w My Event - an alert for this event will be emailed one week prior
- cal 8 15 1w 2d My Event - alerts for this event will be emailed one week and two days prior

### SETUP
1. change the string assignment of the EMAIL variable to your phone number email address.
 
**Use the guide below to figure out the proper email for your number:**
- AT&T: '+###########@txt.att.net'
- T-Mobile: '+###########@tmomail.net'     
- Verizon: '+###########@vtext.com'
- Sprint: '+###########@messaging.sprintpcs.com' 

2. Run the init() function and agree to the permissions

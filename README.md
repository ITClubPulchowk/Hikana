# Hikana  
**The officlal bot of IT-CLUB-Pulchowk**

## Usage Instruction
### Getting Node
#### Linux
Make sure you have node installed.  
If not, you can install it by following the instructions [here](https://nodejs.org/en/download/package-manager/)  

#### Windows 
You can install node from [here](https://nodejs.org/en/download/)  

### Install Dependencies

```
git clone https://github.com/IT-Club-Pulchowk/Hikana.git   
cd Hikana
npm install  
````

### Setup .env file
Before running the project, create a .env file and put the following in it.

```
BOT_TOKEN=<Your-bot-token>  
PREFIX=<Your-prefered-prefix>
```

Replace \<Your-bot-token\> with bot token. If you don't have a bot token yet, you can make one [here](https://discord.com/developers/applications)   
Replace \<Your-prefered-prefix\> with any prefix you may like. Eg:- "!", "^^", ".", etc.     

### Additional Features
Some features, (plot, q) required additional information to function properly.

```
WOLFRAM_TOKEN=<wolfram-token>
Q_CHANNEL=<channel-id>
Q_REACT=<react-required-bool>
Q_REACT_ROLE=<some-channel-role>
```

You can get \<wolfram-token\> by going to their website and creating a developer account. This is required for the plot frature.  
The command "q" is used to send questions to a specific channel. For this, it required a channel id. You can get it by right clicking a text channel and then Copy ID. paste the value in the place of \<channel-id\>  
\<reactt-required-bool\> is a boolean value. If set to true, a moderator must react to the message in a given time<react-time>( not implemented yet, default 2 mins) in minutes for it to reach channel set by \<channel-id\>  
<some-channel-role> is role id of the moderator.


### Running the application
You can now start the bot with  
```
node .
```  

## About 
Alias: Hikana  
Hikan + a  
Pessimistic + a  

Legal Name: Riharu Yuki  
Riharu 理暖  
理 means "management". 暖 means "warm".   
warm manager  
yuki means snow  
basically the stereotypical cold on the outside warm when you get to know her. but also is afraid that her actions might get her into trouble.  
tsundere? platonic tsundere?  

Occupation: part time at IT club discord server. Her boss dosent pay her adequately, bad pranjal. since it can be done online she manages to crunch some overtime while in college.  

Hair Color: Black  
Hair Type: Ironed  
Eye Color: Black  
Skin Color: Wheat    
Voice: If pramish's voice was more cuter than sexy  
Distinguishing Features: Dosent like to make small talk. Only talks when called  
Blood group: B positive  

Powers and Abilities  
Powers: can handle a umbrella one handed while running.  
Power Limitations: shouldnt be wearing heels if she is to reach maximum time management.  
Abilities: can live on ramen for days  
Gadgets/Tech: android + laptop  
Mental/Emotional Weaknesses: she thinks too much about the future and always in a morbid sense. that is why she has gotten the alias hikana.  

###### TODO
* Questions
* notice
* Add instruction for windows
* intro // Server intro (tsundere)
* aboutme
* permission setup
* archive / archive catagory
* mute/ unmute
* osu

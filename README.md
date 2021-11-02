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
```

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

You can get \<wolfram-token\> by going to their website and creating a developer account. This is required for the plot feature.  
The command "q" is used to send questions to a specific channel. For this, it required a channel id. You can get it by right clicking a text channel and then Copy ID. paste the value in the place of \<channel-id\>  
\<react-required-bool\> is a boolean value. If set to true, a moderator must react to the message in a given time<react-time>(not implemented yet, default 2 mins) in minutes for it to reach channel set by \<channel-id\> and \<some-channel-role\> is role id of the moderator.

### Running the application

You can now start the bot with

```
node .
```

## Information

### Profile

- **Alias**: _Hikana_
- **Legal Name**: _Riharu Yuki (Riharu - 理暖)_
- **Meaning**: _Hikan + a (Pessimistic + a). 理 means "management", 暖 means "warm" as in warm manager. Yuki means snow. Basically the stereotypical cold on the outside warm when you get to know her. But also is afraid that her actions might get her into trouble. Tsundere? Platonic Tsundere?_
- **Occupation**: _Part time at IT club discord server. Her boss dosent pay her adequately, bad Pranjal. Since it can be done online she manages to crunch some overtime while in college._
- **Date of Birth**: _31st May 2021_
- **Hair Color**: _Black_
- **Hair Type**: _Ironed_
- **Eye Color**: _Black_
- **Skin Color**: _Wheat_
- **Voice**: _If pramish's voice was more cuter than sexy_
- **Distinguishing Feature**: _Doesn't like to make small talk. Only talks when she is called_
- **Blood Group**: _B Positive_

### Powers and Abilities

- **Powers**: _Can handle a umbrella one handed while running_
- **Power Limitation**: _Shouldn't be wearing heels if she is to reach maximum time management_
- **Abilities**: _Can live on ramen for days_
- **Gadgets/Tech**: _Android + Laptop_
- **Mental/Emotional Weaknesses**: _She thinks too much about the future and always in a morbid sense. That is why she has gotten the alias hikana._

###### TODO

- Removing spam
- Birthday tracker
- Clean -> copy channel features to new channel, then delete old one
- notice
- intro // Server intro (tsundere)
- permission setup
- archive / archive catagory
- osu

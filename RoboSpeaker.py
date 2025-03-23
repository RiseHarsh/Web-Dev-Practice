import pyttsx3

if __name__ == '__main__':
    print("Welcome to RoboSpeaker, Made by Harsh")
    print("To quit RoboSpeaker, type q and enter")

    engine = pyttsx3.init()

    while True:
        x = input("Enter what you want me to pronounce: ")
        if x.lower() == 'q':
            engine.say('bye bye friend')
            engine.runAndWait()
            break
        engine.say(x)
        engine.runAndWait()

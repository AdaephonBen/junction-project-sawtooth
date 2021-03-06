# import the opencv library
import cv2
import time
import os
import requests
# define a video capture object
while True:
    vid = cv2.VideoCapture(os.environ("CAMERA_URL"))
    if vid.isOpened() == False:
        print("Unable to read camera feed")
    frame_width = int(vid.get(3))
    frame_height = int(vid.get(4))
    print("In main loop")
    out = cv2.VideoWriter('outfile.avi', cv2.VideoWriter_fourcc(
        *'MJPG'), 10, (frame_width, frame_height))
    for i in range(50):
        ret, frame = vid.read()
        if ret == True:
            out.write(frame)
        else:
            break
    vid.release()
    out.release()
    with open('outfile.avi', 'rb') as f:
        print("File written")
        print("Posting request")
        r = requests.post(os.environ["ai_url"], files={'file': f})
        if "Walking" in r.text:
            print("Walking is in the response")
            os.system("node index.js register_event --id UP32CE6780 --latitude 26.83 --longitude 80.06 --orientation 270 --metadata 'person fall down' --car_id ID123 --distance 9 --heading_angle 30")
    time.sleep(5)

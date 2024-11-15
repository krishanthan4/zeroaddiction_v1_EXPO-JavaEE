#include <WiFi.h>
#include <Arduino_JSON.h>
#include <Ultrasonic.h>

WiFiServer server(80);  // HTTP server on port 80
Ultrasonic u1(12, 13);  // First Ultrasonic Sensor (Trig Pin, Echo Pin)
Ultrasonic u2(27, 26);  // Second Ultrasonic Sensor (Trig Pin, Echo Pin)

// LDR pins (adjust these if using different pins)
const int ldrPin1 = 32;  // LDR 1 on GPIO 32
const int ldrPin2 = 33;  // LDR 2 on GPIO 33
const int ldrPin3 = 34;  // LDR 3 on GPIO 34

void setup() {
  Serial.begin(115200);
  WiFi.begin("Redmi 10A", "12345678");
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.println("WiFi Connecting...");
  }
  Serial.println("WiFi Connected");
  Serial.println(WiFi.localIP());  // Print the local IP address
  server.begin();  // Start the server
}

void loop() {
  WiFiClient client = server.available();  // Check if a client has connected

  if (client) {
    Serial.println("New Client Connected");
    String currentLine = "";
    while (client.connected()) {
      if (client.available()) {
        char c = client.read();
        currentLine += c;
        Serial.write(c);

        if (c == '\n') {if (currentLine.length() == 1) {break;}
          client.println("HTTP/1.1 200 OK");
          client.println("Access-Control-Allow-Origin: *");
          client.println("Access-Control-Allow-Methods: GET, POST");
          client.println("Access-Control-Allow-Headers: Content-Type");
          client.println("Content-Type: application/json");
          client.println("Connection: close");
          client.println(); 

          if (currentLine.indexOf("GET /?device=1") >= 0) {
            int distance1 = u1.distanceRead(); 
             int distance2 = u2.distanceRead(); 
            int ldrValue1 = analogRead(ldrPin1); 
            int ldrValue2 = analogRead(ldrPin2); 
             int ldrValue3 = analogRead(ldrPin3); 

            JSONVar jsonResponse;
            jsonResponse["ultrasonic1"] = distance1;
            jsonResponse["ultrasonic2"] = distance2;
            jsonResponse["LDR1"] = ldrValue1;
            jsonResponse["LDR2"] = ldrValue2;
            jsonResponse["LDR3"] = ldrValue3;

            String responseString = JSON.stringify(jsonResponse);
            client.println(responseString);  // Send the JSON response
            Serial.println(responseString);  // Print the response to the Serial Monitor

          } else {
            // Respond with a 404 if the request doesn't match
            client.println("HTTP/1.1 404 Not Found");
            client.println("Content-Type: application/json");
            client.println("Connection: close");
            client.println();
            JSONVar errorResponse;
            errorResponse["error"] = "Invalid Request";
            String errorString = JSON.stringify(errorResponse);
            client.println(errorString);
            Serial.println("Invalid Request");
          }

          client.stop();
          Serial.println("Client Disconnected");
        }
      }
    }
  }
}

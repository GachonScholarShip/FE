import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";
import styles from "./FloorPage.module.css";
import LectureModal from "../components/Lecturemodal";
import modalStyles from "../components/Lecturemodal.module.css";
import axios from "axios";

const floorPlans = {
  비전타워: {
    B3 : require("../assets/비전타워&법대 B3F.png"),
    B2 : require("../assets/비전타워&법대 B2F.png"),
    B1 : require("../assets/비전타워&법대 B1F.png"),
    "1" : require("../assets/비전타워&법대 1F.png"),
    "2" : require("../assets/비전타워&법대 2F.jpg"),
    "3": require("../assets/비전타워&법대 3F.png"),
    "4": require("../assets/비전타워&법대 4F.png"),
    "5" : require("../assets/비전타워&법대 5F.png"),
    "6" : require("../assets/비전타워&법대 6F.jpg"),
  },
  가천관: {
    B2 : require("../assets/가천관 B2F.JPG"),
    B1 : require("../assets/가천관 B1F.JPG"),
    "1" : require("../assets/가천관 1F.JPG"),
    "2" : require("../assets/가천관 2F.JPG"),
    "3" : require("../assets/가천관 3F.JPG"),
    "4" : require("../assets/가천관 4F.JPG"),
    "5" : require("../assets/가천관 5F.JPG"),
    "6" : require("../assets/가천관 6F.JPG"),
    "7" : require("../assets/가천관 7F.JPG"),
    "8" : require("../assets/가천관 8F.JPG"),
    "9" : require("../assets/가천관 9F.JPG"),
    "10" : require("../assets/가천관 10F.JPG"),
    "11" : require("../assets/가천관 11F.JPG"),
  },

  공과대학2: {
    B1 : require("../assets/공대1 B1.png"),
    "1" : require("../assets/공대2 1F.png"),
    "2" : require("../assets/공대2 2F.png"),
    "3" : require("../assets/공대2 3F.png"),
    "4" : require("../assets/공대2 4F.png"),
    "5" : require("../assets/공대2 5F.png"),
    "6" : require("../assets/공대2 6F.png"),
  },

  한의과대학: {
    "1" : require("../assets/한의대 1F.jpg"),
    "2" : require("../assets/한의대 2F.jpg"),
    "3" : require("../assets/한의대 3F.jpg"),
    "4" : require("../assets/한의대 4F.jpg"),
    "5" : require("../assets/한의대 5F.jpg"),
  },

  바이오나노연구원: {
    B1 : require("../assets/바나연 B1.png"),
    "1" : require("../assets/바나연 1F.png"),
    "2" : require("../assets/바나연 2F.png"),
    "3" : require("../assets/바나연 3F.png"),
    "4" : require("../assets/바나연 4F.png"),
    "5" : require("../assets/바나연 5F.png"),
  },

  법과대학: {
    B3 : require("../assets/비전타워&법대 B3F.png"),
    B2 : require("../assets/비전타워&법대 B2F.png"),
    B1 : require("../assets/비전타워&법대 B1F.png"),
    "1" : require("../assets/비전타워&법대 1F.png"),
    "2" : require("../assets/비전타워&법대 2F.jpg"),
    "3": require("../assets/비전타워&법대 3F.png"),
    "4": require("../assets/비전타워&법대 4F.png"),
    "5" : require("../assets/비전타워&법대 5F.png"),
    "6" : require("../assets/비전타워&법대 6F.jpg"),
  },

  반도체대학: {
    B1 : require("../assets/반도체 B1.png"),
    B2 : require("../assets/반도체 B2.png"),
    B3 : require("../assets/반도체 B3.png"),
    "1" : require("../assets/반도체 1F.png"),
    "2" : require("../assets/반도체 2F.png"),
    "3" : require("../assets/반도체 3F.png"),
    "4" : require("../assets/반도체 4F.png"),
    "5" : require("../assets/반도체 5F.png"),
    "6" : require("../assets/반도체 6F.png"),

  },

  글로벌센터: {
    B1 : require("../assets/글센 B1.png"),
    "1" : require("../assets/글센 1F.png"),
    "2" : require("../assets/글센 2F.png"),
    "3" : require("../assets/글센 3F.png"),
    "4" : require("../assets/글센 4F.png"),
    "5" : require("../assets/글센 5F.png"),
    "6" : require("../assets/글센 6F.png"),
    "7" : require("../assets/글센 7F.png"),
  },

  공과대학1: {
    B1 : require("../assets/공대1 B1.png"),
    "1" : require("../assets/공대1 1F.png"),
    "2" : require("../assets/공대1 2F.png"),
    "3" : require("../assets/공대1 3F.png"),
    "4" : require("../assets/공대1 4F.png"),
    "5" : require("../assets/공대1 5F.png"),
    "6" : require("../assets/공대1 6F.png"),
    "7" : require("../assets/공대1 7F.png"),
  },

  바이오나노대학: {
    "1" : require("../assets/바나대 1F.png"),
    "2" : require("../assets/바나대 2F.png"),
    "3" : require("../assets/바나대 3F, 1F.png"),
    "4" : require("../assets/바나대 4F, 2F.png"),
    "5" : require("../assets/바나대 5F, 3F.png"),
  },

  '예술.체육대학2' : {
    B1 : require("../assets/예체대2 B1.png"),
    "1" : require("../assets/예체대2 1F.png"),
    "2" : require("../assets/예체대2 2F.png"),
    "3" : require("../assets/예체대2 3F.png"),
    "4" : require("../assets/예체대2 4F.png"),
  },

  '예술.체육대학1': {
    "1" : require("../assets/예체대1 1F.png"),
    "2" : require("../assets/예체대1 2F.png"),
    "3" : require("../assets/예체대1 3F.png"),
    "4" : require("../assets/예체대1 4F.png"),
    "5" : require("../assets/예체대1 5F.png"),
    "6" : require("../assets/예체대1 6F.png"),
    "7" : require("../assets/예체대1 7F.png"),
  },

  교육대학원: {
    B1 : require("../assets/교대 B1.png"),
    B2 : require("../assets/교대 B2.png"),
    "1" : require("../assets/교대 1F.png"),
    "2" : require("../assets/교대 2F.png"),
    "3" : require("../assets/교대 3F.png"),
    "4" : require("../assets/교대 4F.png"),
    "5" : require("../assets/교대 5F.png"),
    "6" : require("../assets/교대 6F.png"),
  },

};

const classroomCoordinates = {
  비전타워: {
    "2": [
      { name: "207", coords: [0.7430, 0.6100, 0.7785, 0.6767], shape: "rect" },
      { name: "208", coords: [0.7430, 0.5433, 0.7813, 0.6083], shape: "rect" },
      { name: "209", coords: [0.7402, 0.4733, 0.7822, 0.5383], shape: "rect" },
      { name: "210", coords: [0.7430, 0.4033, 0.7813, 0.4683], shape: "rect" },
      { name: "211", coords: [0.7430, 0.3383, 0.7822, 0.4033], shape: "rect" },
      { name: "212", coords: [0.7421, 0.2650, 0.7832, 0.3350], shape: "rect" },
      { name: "204", coords: [0.6280, 0.2650, 0.7290, 0.3300], shape: "rect" },
      { name: "206", coords: [0.7065, 0.2417, 0.7486, 0.2650], shape: "rect" },
    ],
    "3": [
      { name: "317", coords: [0.6192, 0.0317, 0.6813, 0.1817], shape: "rect" },
      { name: "318", coords: [0.5603, 0.0283, 0.6192, 0.1867], shape: "rect" },
      { name: "319", coords: [0.5028, 0.0317, 0.5603, 0.1883], shape: "rect" },
      { name: "320", coords: [0.4430, 0.0283, 0.5028, 0.1883], shape: "rect" },
      { name: "314", coords: [0.6226, 0.2233, 0.6839, 0.3733], shape: "rect" },
      { name: "315", coords: [0.5631, 0.2283, 0.6192, 0.3733], shape: "rect" },
      { name: "316", coords: [0.5028, 0.2283, 0.5631, 0.3717], shape: "rect" },
      { name: "324", coords: [0.1505, 0.0383, 0.2093, 0.1983], shape: "rect" },
      { name: "325", coords: [0.0897, 0.0333, 0.1477, 0.1933], shape: "rect" },
      { name: "330", coords: [0.0327, 0.2583, 0.0897, 0.3733], shape: "rect" },
      { name: "331", coords: [0.0308, 0.3783, 0.0897, 0.4883], shape: "rect" },
      { name: "332", coords: [0.0271, 0.4883, 0.0897, 0.6017], shape: "rect" },
      { name: "333", coords: [0.0271, 0.6033, 0.0897, 0.7133], shape: "rect" },
      { name: "334", coords: [0.0271, 0.7183, 0.0870, 0.8283], shape: "rect" },
      { name: "335", coords: [0.0243, 0.8283, 0.0859, 0.9517], shape: "rect" },
      { name: "336", coords: [0.1093, 0.4817, 0.1811, 0.6367], shape: "rect" },
      { name: "323", coords: [0.1131, 0.8367, 0.1704, 0.9883], shape: "rect" },
      { name: "326", coords: [0.2019, 0.8367, 0.2626, 0.9400], shape: "rect" }
    ],    
    "4": [
      { name: "430", coords: [0.0383, 0.2683, 0.1009, 0.3867], shape: "rect" },
      { name: "431", coords: [0.0383, 0.3883, 0.1028, 0.4983], shape: "rect" },
      { name: "432", coords: [0.0383, 0.5017, 0.1028, 0.6083], shape: "rect" },
      { name: "433", coords: [0.0383, 0.6117, 0.1028, 0.7217], shape: "rect" },
      { name: "434", coords: [0.0383, 0.7283, 0.1028, 0.8333], shape: "rect" },
      { name: "435", coords: [0.0383, 0.8383, 0.1028, 0.9517], shape: "rect" },
      { name: "427", coords: [0.2206, 0.4967, 0.2850, 0.6133], shape: "rect" },
      { name: "428", coords: [0.2206, 0.3833, 0.2827, 0.4933], shape: "rect" },
      { name: "429", coords: [0.2187, 0.2633, 0.2827, 0.3833], shape: "rect" },
      { name: "426", coords: [0.0972, 0.0467, 0.1589, 0.1983], shape: "rect" },
      { name: "425", coords: [0.1589, 0.0433, 0.2206, 0.2017], shape: "rect" },
      { name: "419", coords: [0.6393, 0.0333, 0.7009, 0.1883], shape: "rect" },
      { name: "420", coords: [0.5806, 0.0367, 0.6393, 0.1933], shape: "rect" },
      { name: "421", coords: [0.5196, 0.0383, 0.5766, 0.1933], shape: "rect" },
      { name: "422", coords: [0.4598, 0.0417, 0.5196, 0.1917], shape: "rect" },
      { name: "415", coords: [0.6411, 0.2333, 0.7037, 0.3733], shape: "rect" },
      { name: "416", coords: [0.5785, 0.2333, 0.6393, 0.3817], shape: "rect" },
      { name: "417", coords: [0.5215, 0.2367, 0.5766, 0.3833], shape: "rect" },
      { name: "418", coords: [0.4604, 0.2383, 0.5196, 0.3783], shape: "rect" }
    ],
    "5": [
      { name: "523", coords: [0.0327, 0.2617, 0.0897, 0.3750], shape: "rect" },
      { name: "524", coords: [0.0299, 0.3767, 0.0897, 0.4867], shape: "rect" },
      { name: "525", coords: [0.0271, 0.4917, 0.0897, 0.6000], shape: "rect" },
      { name: "515", coords: [0.1121, 0.8317, 0.1701, 0.9800], shape: "rect" },
      { name: "520", coords: [0.2037, 0.4917, 0.2645, 0.6000], shape: "rect" },
      { name: "521", coords: [0.2037, 0.3717, 0.2654, 0.4867], shape: "rect" },
      { name: "522", coords: [0.2047, 0.2583, 0.2678, 0.3733], shape: "rect" },
      { name: "502", coords: [0.6226, 0.0283, 0.6775, 0.1833], shape: "rect" },
      { name: "503", coords: [0.5603, 0.0283, 0.6192, 0.1867], shape: "rect" },
      { name: "507", coords: [0.4430, 0.2317, 0.5000, 0.3733], shape: "rect" },
      { name: "508", coords: [0.5028, 0.2267, 0.5603, 0.3767], shape: "rect" },
      { name: "509", coords: [0.5631, 0.2233, 0.6192, 0.3717], shape: "rect" },
      { name: "510", coords: [0.6226, 0.2217, 0.6839, 0.3717], shape: "rect" }
    ],
    "6": [
      { name: "612", coords: ["0.2289", "0.4000", "0.2900", "0.5017"], shape: "rect" },
      { name: "613", coords: ["0.2289", "0.2882", "0.2900", "0.3950"], shape: "rect" },
      { name: "607", coords: ["0.2300", "0.0780", "0.2951", "0.2282"], shape: "rect" },
      { name: "608", coords: ["0.1700", "0.0802", "0.2300", "0.2282"], shape: "rect" },
      { name: "609", coords: ["0.1050", "0.0780", "0.1679", "0.2282"], shape: "rect" },
      { name: "615", coords: ["0.0477", "0.2912", "0.1112", "0.3967"], shape: "rect" },
      { name: "616", coords: ["0.0458", "0.3950", "0.1112", "0.4950"], shape: "rect" },
      { name: "617", coords: ["0.0458", "0.5017", "0.1112", "0.6017"], shape: "rect" },
      { name: "618", coords: ["0.0477", "0.6050", "0.1112", "0.7050"], shape: "rect" },
      { name: "619", coords: ["0.0495", "0.7100", "0.1112", "0.8150"], shape: "rect" },
    ],
  },

  가천관: {
    "B1": [
      { name: "B101", coords: [0.2804, 0.495, 0.3813, 0.7117], shape: "rect" },
      { name: "B102", coords: [0.3963, 0.47, 0.4421, 0.5317], shape: "rect" },
      { name: "B103", coords: [0.3963, 0.5317, 0.4421, 0.5917], shape: "rect" },
      { name: "B105", coords: [0.3963, 0.65, 0.4421, 0.7083], shape: "rect" },      
    ],
    "3": [
      { name: "314", coords: [0.0757, 0.095, 0.2103, 0.2767], shape: "rect" },
      { name: "315", coords: [0.2121, 0.105, 0.3514, 0.2783], shape: "rect" },
      { name: "316", coords: [0.6505, 0.1, 0.7925, 0.285], shape: "rect" },
      { name: "317", coords: [0.7963, 0.11, 0.9346, 0.285], shape: "rect" },
      { name: "313", coords: [0.0738, 0.515, 0.1383, 0.795, 0.2075, 0.7617, 0.2093, 0.5217], shape: "poly" },
      { name: "312", coords: [0.2112, 0.52, 0.3252, 0.5217, 0.3234, 0.7017, 0.2112, 0.755], shape: "poly" },
      { name: "302", coords: [0.6785, 0.525, 0.7944, 0.5283, 0.7925, 0.765, 0.6785, 0.7], shape: "poly" },
      { name: "301", coords: [0.7963, 0.5283, 0.9327, 0.53, 0.9346, 0.8067, 0.8738, 0.8083, 0.7944, 0.77], shape: "poly" },
    ],
    "4": [
      { name: "415", coords: [0.071, 0.125, 0.2075, 0.2933], shape: "rect" },
      { name: "416", coords: [0.2093, 0.1317, 0.3206, 0.295], shape: "rect" },
      { name: "419", coords: [0.5589, 0.1383, 0.6355, 0.305], shape: "rect" },
      { name: "420", coords: [0.6374, 0.1417, 0.7112, 0.305], shape: "rect" },
      { name: "421", coords: [0.715, 0.1417, 0.785, 0.3067], shape: "rect" },
      { name: "422", coords: [0.7907, 0.145, 0.9252, 0.3067], shape: "rect" },
      { name: "414", coords: [0.0654, 0.52, 0.0636, 0.7983, 0.1215, 0.7917, 0.2019, 0.755, 0.2037, 0.525], shape: "poly" },
      { name: "413", coords: [0.2075, 0.5217, 0.2056, 0.745, 0.3224, 0.6917, 0.3215, 0.525], shape: "poly" },
      { name: "403", coords: [0.6748, 0.5317, 0.673, 0.6983, 0.785, 0.7567, 0.785, 0.5333], shape: "poly" },
      { name: "402", coords: [0.7869, 0.535, 0.8636, 0.535, 0.8626, 0.8067, 0.7888, 0.7583], shape: "poly" },
      { name: "401", coords: [0.8636, 0.5383, 0.9234, 0.5383, 0.9252, 0.8117, 0.8654, 0.8083], shape: "poly" },
    ],
    "5": [
      { name: "514", coords: [0.0636, 0.1283, 0.2019, 0.3017], shape: "rect" },
      { name: "515", coords: [0.2037, 0.1383, 0.3215, 0.2967], shape: "rect" },
      { name: "518", coords: [0.6056, 0.1450, 0.6701, 0.3033], shape: "rect" },
      { name: "519", coords: [0.6729, 0.1483, 0.7869, 0.3083], shape: "rect" },
      { name: "520", coords: [0.7907, 0.1533, 0.9252, 0.3100], shape: "rect" },
      { name: "513", coords: [0.0654, 0.5217, 0.0617, 0.7883, 0.1065, 0.7883, 0.1981, 0.7517, 0.2000, 0.5267], shape: "poly" },
      { name: "512", coords: [0.2019, 0.5250, 0.2019, 0.7433, 0.3168, 0.6933, 0.3178, 0.5317], shape: "poly" },
      { name: "502", coords: [0.6701, 0.5383, 0.6701, 0.7017, 0.7869, 0.7633, 0.7869, 0.5383], shape: "poly" },
      { name: "501", coords: [0.7907, 0.5383, 0.7907, 0.7650, 0.8804, 0.8217, 0.9308, 0.8217, 0.9262, 0.5450], shape: "poly" },
      { name: "701", coords: [0.8056, 0.8750, 0.8579, 0.8800, 0.8579, 1.3333, 0.8084, 1.3300], shape: "poly" }
    ],
    "6": [
      { name: "614", coords: [0.0860, 0.1300, 0.2159, 0.2850], shape: "rect" },
      { name: "615", coords: [0.2187, 0.1333, 0.3308, 0.2883], shape: "rect" },
      { name: "616", coords: [0.3336, 0.1333, 0.4439, 0.2900], shape: "rect" },
      { name: "617", coords: [0.4467, 0.1400, 0.5551, 0.2917], shape: "rect" },
      { name: "618", coords: [0.5579, 0.1433, 0.6673, 0.2950], shape: "rect" },
      { name: "619", coords: [0.6692, 0.1483, 0.7776, 0.2983], shape: "rect" },
      { name: "620", coords: [0.7794, 0.1533, 0.9103, 0.3050], shape: "rect" },
      { name: "613", coords: [0.0850, 0.4950, 0.0822, 0.7433, 0.1401, 0.7517, 0.2168, 0.7217, 0.2168, 0.4983], shape: "poly" },
      { name: "612", coords: [0.2215, 0.5000, 0.2206, 0.7117, 0.3289, 0.6583, 0.3308, 0.5033], shape: "poly" },
      { name: "602", coords: [0.6673, 0.5150, 0.7710, 0.5150, 0.7757, 0.7350, 0.6664, 0.6700], shape: "poly" },
      { name: "601", coords: [0.7813, 0.5183, 0.9140, 0.5217, 0.9112, 0.7850, 0.8692, 0.7800, 0.7813, 0.7317], shape: "poly" },
    ],
    "7": [
      { name: "714", coords: [0.0776, 0.0983, 0.2131, 0.2583], shape: "rect" },
      { name: "715", coords: [0.2131, 0.1017, 0.3308, 0.2583], shape: "rect" },
      { name: "718", coords: [0.5626, 0.1117, 0.6804, 0.2700], shape: "rect" },
      { name: "719", coords: [0.6841, 0.1133, 0.7925, 0.2683], shape: "rect" },
      { name: "720", coords: [0.7963, 0.1100, 0.9308, 0.2717], shape: "rect" },
      { name: "713", coords: [0.0748, 0.4817, 0.0757, 0.7383, 0.1336, 0.7383, 0.2112, 0.7000, 0.2112, 0.4817], shape: "poly" },
      { name: "712", coords: [0.2150, 0.4783, 0.2112, 0.6933, 0.3308, 0.6433, 0.3308, 0.4867], shape: "poly" },
      { name: "702", coords: [0.6794, 0.4900, 0.6766, 0.6483, 0.7888, 0.7117, 0.7897, 0.4917], shape: "poly" },
      { name: "701", coords: [0.7963, 0.4917, 0.7935, 0.7133, 0.8850, 0.7583, 0.9271, 0.7600, 0.9262, 0.4967], shape: "poly" },
    
    ],
    "8": [
      { name: "824", coords: [0.0710, 0.0850, 0.2103, 0.2533], shape: "rect" },
      { name: "840", coords: [0.8010, 0.1133, 0.9365, 0.2783], shape: "rect" },
    ],
    "9": [
      { name: "940", coords: [0.7916, 0.1183, 0.9252, 0.2733], shape: "rect" },
      { name: "924", coords: [0.0654, 0.1083, 0.2009, 0.2717], shape: "rect" },
    ],
  },

  공과대학2: {
    "B1": [
      { name: "b101", coords: [0.341176, 0.175, 0.428037, 0.34], shape: "rect" },
      { name: "B102", coords: [0.32, 0.346667, 0.424299, 0.538333], shape: "rect" }
    ],
   "1": [
      { name: "101", coords: [0.268, 0.430, 0.324, 0.600], shape: "rect" },
      { name: "102", coords: [0.329, 0.490, 0.329, 0.720, 0.410, 0.720, 0.411, 0.427, 0.376, 0.430, 0.372, 0.490], shape: "poly" },
      { name: "103", coords: [0.414, 0.485, 0.514, 0.723], shape: "rect" },
      { name: "104", coords: [0.622, 0.430, 0.724, 0.430, 0.724, 0.610, 0.813, 0.607, 0.816, 0.720, 0.622, 0.718], shape: "poly" },
      { name: "105", coords: [0.731, 0.483, 0.818, 0.600], shape: "rect" },
      { name: "106", coords: [0.818, 0.535, 0.908, 0.720], shape: "rect" },
      { name: "107", coords: [0.806, 0.228, 0.807, 0.287, 0.841, 0.287, 0.883, 0.207, 0.850, 0.143], shape: "poly" },
      { name: "108", coords: [0.774, 0.223, 0.804, 0.375], shape: "rect" },
      { name: "109-A", coords: [0.743, 0.227, 0.771, 0.372], shape: "rect" },
      { name: "109-B", coords: [0.712, 0.227, 0.743, 0.372], shape: "rect" },
      { name: "110-A", coords: [0.663, 0.227, 0.707, 0.372], shape: "rect" },
      { name: "110-B", coords: [0.615, 0.228, 0.662, 0.375], shape: "rect" },
      { name: "111", coords: [0.427, 0.228, 0.519, 0.375], shape: "rect" },
      { name: "112-B", coords: [0.379, 0.228, 0.422, 0.375], shape: "rect" },
      { name: "112-A", coords: [0.332, 0.228, 0.374, 0.370], shape: "rect" }
   ],
    "2": [
      { name: "201", coords: [0.051, 0.303, 0.193, 0.595], shape: "rect" },
      { name: "202", coords: [0.234, 0.527, 0.320, 0.770], shape: "rect" },
      { name: "203", coords: [0.324, 0.465, 0.407, 0.770], shape: "rect" },
      { name: "204", coords: [0.408, 0.520, 0.507, 0.770], shape: "rect" },
      { name: "205", coords: [0.513, 0.467, 0.608, 0.723], shape: "rect" },
      { name: "206", coords: [0.614, 0.465, 0.719, 0.770], shape: "rect" },
      { name: "207", coords: [0.723, 0.522, 0.806, 0.773], shape: "rect" },
      { name: "208", coords: [0.812, 0.462, 0.897, 0.685], shape: "rect" },
      { name: "209", coords: [0.767, 0.253, 0.796, 0.410], shape: "rect" },
      { name: "210", coords: [0.732, 0.253, 0.763, 0.410], shape: "rect" },
      { name: "211", coords: [0.703, 0.253, 0.732, 0.405], shape: "rect" },
      { name: "212", coords: [0.673, 0.253, 0.702, 0.412], shape: "rect" },
      { name: "213", coords: [0.642, 0.253, 0.673, 0.407], shape: "rect" },
      { name: "214", coords: [0.611, 0.258, 0.639, 0.405], shape: "rect" },
      { name: "215", coords: [0.484, 0.253, 0.514, 0.405], shape: "rect" },
      { name: "216", coords: [0.452, 0.252, 0.480, 0.410], shape: "rect" },
      { name: "217", coords: [0.421, 0.248, 0.449, 0.410], shape: "rect" },
      { name: "218", coords: [0.391, 0.253, 0.417, 0.415], shape: "rect" },
      { name: "219", coords: [0.358, 0.253, 0.387, 0.410], shape: "rect" },
      { name: "220", coords: [0.327, 0.253, 0.357, 0.410], shape: "rect" }
    ],
    "3": [
      { name: "301", coords: [0.048, 0.422, 0.152, 0.570], shape: "rect" },
      { name: "322", coords: [0.317, 0.227, 0.345, 0.380], shape: "rect" },
      { name: "321", coords: [0.349, 0.228, 0.376, 0.380], shape: "rect" },
      { name: "320", coords: [0.378, 0.232, 0.409, 0.382], shape: "rect" },
      { name: "319", coords: [0.409, 0.232, 0.436, 0.380], shape: "rect" },
      { name: "318", coords: [0.439, 0.232, 0.469, 0.380], shape: "rect" },
      { name: "317", coords: [0.471, 0.228, 0.501, 0.382], shape: "rect" },
      { name: "322", coords: [0.504, 0.228, 0.559, 0.260], shape: "rect" },
      { name: "316", coords: [0.593, 0.228, 0.623, 0.380], shape: "rect" },
      { name: "315", coords: [0.624, 0.225, 0.654, 0.382], shape: "rect" },
      { name: "314", coords: [0.655, 0.228, 0.685, 0.382], shape: "rect" },
      { name: "313", coords: [0.686, 0.227, 0.716, 0.380], shape: "rect" },
      { name: "312", coords: [0.717, 0.228, 0.745, 0.380], shape: "rect" },
      { name: "311", coords: [0.748, 0.225, 0.777, 0.382], shape: "rect" },
      { name: "310", coords: [0.821, 0.138, 0.779, 0.223, 0.779, 0.293, 0.810, 0.293, 0.853, 0.207], shape: "poly" },
      { name: "309", coords: [0.813, 0.295, 0.830, 0.333, 0.850, 0.333, 0.881, 0.268, 0.855, 0.213], shape: "poly" },
      { name: "308-B", coords: [0.836, 0.497, 0.878, 0.743], shape: "rect" },
      { name: "308-A", coords: [0.791, 0.438, 0.792, 0.745, 0.833, 0.747, 0.833, 0.493, 0.873, 0.497, 0.876, 0.442], shape: "poly" },
      { name: "307-B", coords: [0.747, 0.568, 0.786, 0.743], shape: "rect" },
      { name: "307-A", coords: [0.703, 0.567, 0.747, 0.745], shape: "rect" },
      { name: "306-B", coords: [0.659, 0.438, 0.703, 0.742], shape: "rect" },
      { name: "306-A", coords: [0.599, 0.442, 0.657, 0.742], shape: "rect" },
      { name: "305-B", coords: [0.548, 0.442, 0.594, 0.693], shape: "rect" },
      { name: "305-A", coords: [0.499, 0.442, 0.546, 0.693], shape: "rect" },
      { name: "304-A", coords: [0.397, 0.533, 0.450, 0.745], shape: "rect" },
      { name: "304-B", coords: [0.450, 0.540, 0.495, 0.747], shape: "rect" },
      { name: "303-B", coords: [0.355, 0.437, 0.394, 0.745], shape: "rect" },
      { name: "303-A", coords: [0.313, 0.493, 0.352, 0.745], shape: "rect" },
      { name: "302", coords: [0.228, 0.505, 0.310, 0.742], shape: "rect" },
      { name: "302-A", coords: [0.257, 0.435, 0.310, 0.498], shape: "rect" }
    ],
    4: [
      { name: "416", coords: [0.327, 0.167, 0.356, 0.360], shape: "rect" },
      { name: "415-A", coords: [0.389, 0.167, 0.421, 0.360], shape: "rect" },
      { name: "415-B", coords: [0.358, 0.165, 0.389, 0.358], shape: "rect" },
      { name: "414-A", coords: [0.453, 0.167, 0.517, 0.363], shape: "rect" },
      { name: "414-B", coords: [0.422, 0.167, 0.450, 0.360], shape: "rect" },
      { name: "413", coords: [0.616, 0.170, 0.647, 0.358], shape: "rect" },
      { name: "412", coords: [0.647, 0.172, 0.680, 0.362], shape: "rect" },
      { name: "411", coords: [0.680, 0.172, 0.711, 0.362], shape: "rect" },
      { name: "410", coords: [0.713, 0.172, 0.742, 0.360], shape: "rect" },
      { name: "409", coords: [0.745, 0.168, 0.774, 0.362], shape: "rect" },
      { name: "408", coords: [0.777, 0.170, 0.806, 0.358], shape: "rect" },
      { name: "401", coords: [0.231, 0.507, 0.320, 0.810], shape: "rect" },
      { name: "402", coords: [0.322, 0.503, 0.407, 0.812], shape: "rect" },
      { name: "403", coords: [0.411, 0.552, 0.512, 0.810], shape: "rect" },
      { name: "404", coords: [0.517, 0.430, 0.615, 0.750], shape: "rect" },
      { name: "405", coords: [0.622, 0.433, 0.727, 0.813], shape: "rect" },
      { name: "406", coords: [0.729, 0.592, 0.819, 0.810], shape: "rect" },
      { name: "407", coords: [0.819, 0.432, 0.912, 0.812], shape: "rect" }
    ],
    5: [
      { name: "520", coords: [0.328, 0.203, 0.356, 0.355], shape: "rect" },
      { name: "519", coords: [0.358, 0.207, 0.389, 0.352], shape: "rect" },
      { name: "518", coords: [0.389, 0.203, 0.420, 0.352], shape: "rect" },
      { name: "517", coords: [0.422, 0.203, 0.451, 0.352], shape: "rect" },
      { name: "516", coords: [0.453, 0.207, 0.482, 0.352], shape: "rect" },
      { name: "515", coords: [0.482, 0.210, 0.514, 0.352], shape: "rect" },
      { name: "514", coords: [0.612, 0.207, 0.640, 0.353], shape: "rect" },
      { name: "513", coords: [0.641, 0.207, 0.671, 0.350], shape: "rect" },
      { name: "512", coords: [0.672, 0.207, 0.702, 0.350], shape: "rect" },
      { name: "511", coords: [0.705, 0.207, 0.733, 0.350], shape: "rect" },
      { name: "510", coords: [0.736, 0.205, 0.768, 0.353], shape: "rect" },
      { name: "509", coords: [0.770, 0.210, 0.797, 0.355], shape: "rect" },
      { name: "508", coords: [0.811, 0.412, 0.897, 0.703], shape: "rect" },
      { name: "507", coords: [0.721, 0.465, 0.808, 0.703], shape: "rect" },
      { name: "506", coords: [0.616, 0.408, 0.719, 0.703], shape: "rect" },
      { name: "505", coords: [0.515, 0.408, 0.612, 0.652], shape: "rect" },
      { name: "504", coords: [0.408, 0.503, 0.511, 0.700], shape: "rect" },
      { name: "503", coords: [0.324, 0.410, 0.406, 0.698], shape: "rect" },
      { name: "502", coords: [0.236, 0.472, 0.320, 0.700], shape: "rect" },
      { name: "501-A", coords: [0.160, 0.333, 0.196, 0.533], shape: "rect" },
      { name: "501-B", coords: [0.051, 0.250, 0.158, 0.535], shape: "rect" }
    ],
    6: [
      { name: "601-A", coords: [0.064, 0.335, 0.135, 0.578], shape: "rect" },
      { name: "601-B", coords: [0.136, 0.333, 0.206, 0.578], shape: "rect" },
      { name: "602", coords: [0.244, 0.193, 0.517, 0.457], shape: "rect" },
      { name: "603", coords: [0.520, 0.442, 0.615, 0.702], shape: "rect" },
      { name: "604", coords: [0.616, 0.195, 0.616, 0.457, 0.897, 0.448, 0.786, 0.205], shape: "poly" }
    ]
  },

  한의과대학: {
    "1": [
      { name: "100", coords: [0.032, 0.118, 0.199, 0.375], shape: "rect" },
      { name: "101", coords: [0.205, 0.485, 0.322, 0.745], shape: "rect" },
      { name: "101-A", coords: [0.329, 0.480, 0.382, 0.740], shape: "rect" },
      { name: "102", coords: [0.381, 0.477, 0.621, 0.740], shape: "rect" },
      { name: "103-A", coords: [0.623, 0.475, 0.677, 0.740], shape: "rect" },
      { name: "103", coords: [0.680, 0.475, 0.932, 0.740], shape: "rect" },
      { name: "104", coords: [0.619, 0.118, 0.912, 0.375], shape: "rect" },
      { name: "104-B", coords: [0.562, 0.118, 0.616, 0.375], shape: "rect" },
      { name: "105", coords: [0.437, 0.118, 0.557, 0.375], shape: "rect" }
    ],
    "2": [
      { name: "207", coords: [0.362, 0.093, 0.595, 0.410], shape: "rect" },
      { name: "206", coords: [0.598, 0.087, 0.800, 0.412], shape: "rect" },
      { name: "205-A", coords: [0.856, 0.082, 0.909, 0.412], shape: "rect" },
      { name: "205-B", coords: [0.802, 0.078, 0.855, 0.415], shape: "rect" },
      { name: "204", coords: [0.741, 0.533, 0.926, 0.908], shape: "rect" },
      { name: "203", coords: [0.523, 0.538, 0.736, 0.908], shape: "rect" },
      { name: "202", coords: [0.297, 0.538, 0.518, 0.913], shape: "rect" },
      { name: "202-C", coords: [0.205, 0.538, 0.292, 0.917], shape: "rect" },
      { name: "202-B", coords: [0.110, 0.538, 0.199, 0.918], shape: "rect" },
      { name: "202-A", coords: [0.015, 0.543, 0.104, 0.923], shape: "rect" }
    ],
    "3": [
      { name: "307", coords: [0.361, 0.057, 0.522, 0.393], shape: "rect" },
      { name: "306", coords: [0.525, 0.057, 0.738, 0.390], shape: "rect" },
      { name: "305-A", coords: [0.831, 0.057, 0.904, 0.388], shape: "rect" },
      { name: "305-B", coords: [0.741, 0.055, 0.828, 0.388], shape: "rect" },
      { name: "304-B", coords: [0.805, 0.510, 0.859, 0.890], shape: "rect" },
      { name: "304-A", coords: [0.744, 0.508, 0.791, 0.892], shape: "rect" },
      { name: "303-B", coords: [0.593, 0.513, 0.663, 0.887], shape: "rect" },
      { name: "303-A", coords: [0.520, 0.513, 0.589, 0.887], shape: "rect" },
      { name: "302-B", coords: [0.367, 0.513, 0.439, 0.892], shape: "rect" },
      { name: "302-A", coords: [0.294, 0.508, 0.364, 0.897], shape: "rect" },
      { name: "301", coords: [0.011, 0.510, 0.289, 0.898], shape: "rect" },
      { name: "304-C", coords: [0.862, 0.510, 0.923, 0.888], shape: "rect" },
      { name: "303-C", coords: [0.666, 0.508, 0.739, 0.888], shape: "rect" },
      { name: "302-C", coords: [0.442, 0.510, 0.517, 0.892], shape: "rect" }
    ],
    "4": [
      { name: "405", coords: [0.260, 0.090, 0.341, 0.422], shape: "rect" },
      { name: "405-A", coords: [0.342, 0.088, 0.557, 0.422], shape: "rect" },
      { name: "404-A", coords: [0.741, 0.083, 0.820, 0.425], shape: "rect" },
      { name: "404", coords: [0.822, 0.082, 0.894, 0.427], shape: "rect" },
      { name: "403", coords: [0.840, 0.555, 0.912, 0.943], shape: "rect" },
      { name: "403-A", coords: [0.567, 0.545, 0.831, 0.930], shape: "rect" },
      { name: "402", coords: [0.491, 0.545, 0.564, 0.925], shape: "rect" },
      { name: "402-A", coords: [0.270, 0.540, 0.488, 0.920], shape: "rect" },
      { name: "401-A", coords: [0.101, 0.540, 0.266, 0.915], shape: "rect" },
      { name: "401", coords: [0.028, 0.535, 0.098, 0.910], shape: "rect" },
      { name: "404-B", coords: [0.560, 0.087, 0.741, 0.425], shape: "rect" }
    ],
    "5": [
      { name: "505-C", coords: [0.292, 0.083, 0.364, 0.417], shape: "rect" },
      { name: "505-B", coords: [0.367, 0.083, 0.435, 0.417], shape: "rect" },
      { name: "505", coords: [0.437, 0.083, 0.511, 0.420], shape: "rect" },
      { name: "505-A", coords: [0.515, 0.083, 0.594, 0.415], shape: "rect" },
      { name: "504-B", coords: [0.595, 0.083, 0.745, 0.415], shape: "rect" },
      { name: "504-A", coords: [0.754, 0.078, 0.820, 0.420], shape: "rect" },
      { name: "504", coords: [0.825, 0.078, 0.893, 0.417], shape: "rect" },
      { name: "503-B", coords: [0.848, 0.542, 0.912, 0.935], shape: "rect" },
      { name: "503-A", coords: [0.769, 0.542, 0.842, 0.930], shape: "rect" },
      { name: "502-C", coords: [0.519, 0.542, 0.598, 0.930], shape: "rect" },
      { name: "502-B", coords: [0.294, 0.537, 0.517, 0.930], shape: "rect" },
      { name: "502-A", coords: [0.227, 0.540, 0.289, 0.930], shape: "rect" },
      { name: "501", coords: [0.023, 0.540, 0.219, 0.938], shape: "rect" }
    ]
  },

  바이오나노연구원: {
    "B1": [
      { name: "B115", coords: [0.063, 0.322, 0.096, 0.505], shape: "rect" },
      { name: "B114", coords: [0.099, 0.32, 0.139, 0.505], shape: "rect" },
      { name: "B113", coords: [0.194, 0.325, 0.297, 0.503], shape: "rect" },
      { name: "B112", coords: [0.299, 0.32, 0.346, 0.5], shape: "rect" },
      { name: "B111", coords: [0.655, 0.305, 0.753, 0.503], shape: "rect" },
      { name: "B110", coords: [0.755, 0.303, 0.844, 0.503], shape: "rect" },
      { name: "B109", coords: [0.847, 0.305, 0.944, 0.502], shape: "rect" },
      { name: "B101", coords: [0.055, 0.582, 0.145, 0.82], shape: "rect" },
      { name: "B102", coords: [0.145, 0.578, 0.243, 0.82], shape: "rect" },
      { name: "B103", coords: [0.247, 0.58, 0.409, 0.838], shape: "rect" },
      { name: "B104", coords: [0.412, 0.582, 0.547, 0.837], shape: "rect" },
      { name: "B105", coords: [0.554, 0.582, 0.708, 0.835], shape: "rect" },
      { name: "B106", coords: [0.71, 0.583, 0.844, 0.838], shape: "rect" },
      { name: "B107", coords: [0.847, 0.582, 0.947, 0.833], shape: "rect" },
    ],
    "1": [
      { name: "110", coords: [0.128, 0.178, 0.183, 0.442], shape: "rect" },
      { name: "109", coords: [0.185, 0.18, 0.24, 0.442], shape: "rect" },
      { name: "180", coords: [0.241, 0.18, 0.3, 0.443], shape: "rect" },
      { name: "107", coords: [0.659, 0.18, 0.744, 0.442], shape: "rect" },
      { name: "106", coords: [0.745, 0.18, 0.83, 0.442], shape: "rect" },
      { name: "105", coords: [0.834, 0.18, 0.895, 0.442], shape: "rect" },
      { name: "101", coords: [0.128, 0.54, 0.355, 0.793], shape: "rect" },
      { name: "102", coords: [0.596, 0.537, 0.614, 0.538, 0.614, 0.673, 0.653, 0.668, 0.653, 0.798, 0.596, 0.793], shape: "poly" },
      { name: "103", coords: [0.658, 0.54, 0.658, 0.615, 0.716, 0.612, 0.717, 0.793, 0.832, 0.793, 0.832, 0.547], shape: "poly" },
      { name: "104", coords: [0.835, 0.542, 0.894, 0.795], shape: "rect" },
    ],
    "2": [
      { name: "213", coords: [0.042, 0.153, 0.09, 0.423], shape: "rect" },
      { name: "212", coords: [0.093, 0.15, 0.14, 0.423], shape: "rect" },
      { name: "211", coords: [0.248, 0.155, 0.297, 0.426], shape: "rect" },
      { name: "210", coords: [0.302, 0.153, 0.352, 0.426], shape: "rect" },
      { name: "209", coords: [0.659, 0.15, 0.756, 0.426], shape: "rect" },
      { name: "208", coords: [0.759, 0.153, 0.805, 0.426], shape: "rect" },
      { name: "207", coords: [0.81, 0.15, 0.855, 0.428], shape: "rect" },
      { name: "206", coords: [0.859, 0.148, 0.905, 0.426], shape: "rect" },
      { name: "205", coords: [0.908, 0.15, 0.952, 0.426], shape: "rect" },
      { name: "실험실2", coords: [0.042, 0.438, 0.343, 0.912], shape: "rect" },
      { name: "202", coords: [0.344, 0.522, 0.392, 0.913], shape: "rect" },
      { name: "204", coords: [0.602, 0.533, 0.699, 0.915], shape: "rect" },
      { name: "실험실3", coords: [0.703, 0.438, 0.957, 0.915], shape: "rect" },
    ],
    "3": [
      { name: "315", coords: [0.052, 0.222, 0.099, 0.475], shape: "rect" },
      { name: "314", coords: [0.101, 0.217, 0.147, 0.48], shape: "rect" },
      { name: "313", coords: [0.205, 0.218, 0.251, 0.477], shape: "rect" },
      { name: "312", coords: [0.256, 0.217, 0.302, 0.317], shape: "rect" },
      { name: "311", coords: [0.304, 0.218, 0.349, 0.477], shape: "rect" },
      { name: "310", coords: [0.653, 0.217, 0.7, 0.477], shape: "rect" },
      { name: "309", coords: [0.702, 0.218, 0.753, 0.475], shape: "rect" },
      { name: "308", coords: [0.754, 0.217, 0.8, 0.478], shape: "rect" },
      { name: "307", coords: [0.803, 0.217, 0.849, 0.475], shape: "rect" },
      { name: "306", coords: [0.852, 0.222, 0.9, 0.475], shape: "rect" },
      { name: "305", coords: [0.902, 0.218, 0.953, 0.477], shape: "rect" },
      { name: "303", coords: [0.349, 0.56, 0.555, 0.875], shape: "rect" },
      { name: "304", coords: [0.558, 0.555, 0.653, 0.877], shape: "rect" },
    ],
    "4": [
      { name: "413", coords: [0.055, 0.163, 0.099, 0.423], shape: "rect" },
      { name: "412", coords: [0.104, 0.16, 0.15, 0.426], shape: "rect" },
      { name: "411", coords: [0.205, 0.16, 0.352, 0.426], shape: "rect" },
      { name: "410", coords: [0.656, 0.163, 0.802, 0.423], shape: "rect" },
      { name: "409", coords: [0.805, 0.162, 0.957, 0.425], shape: "rect" },
      { name: "401", coords: [0.053, 0.51, 0.203, 0.843], shape: "rect" },
      { name: "402", coords: [0.205, 0.512, 0.28, 0.837], shape: "rect" },
      { name: "403", coords: [0.281, 0.51, 0.348, 0.842], shape: "rect" },
      { name: "404", coords: [0.349, 0.51, 0.4, 0.837], shape: "rect" },
      { name: "406", coords: [0.591, 0.512, 0.653, 0.837], shape: "rect" },
      { name: "407", coords: [0.655, 0.507, 0.805, 0.835], shape: "rect" },
      { name: "408", coords: [0.805, 0.51, 0.956, 0.838], shape: "rect" },
    ],
    "5": [
      { name: "515", coords: [0.055, 0.155, 0.106, 0.41], shape: "rect" },
      { name: "514", coords: [0.107, 0.155, 0.155, 0.413], shape: "rect" },
      { name: "513", coords: [0.212, 0.152, 0.259, 0.41], shape: "rect" },
      { name: "512", coords: [0.262, 0.155, 0.311, 0.408], shape: "rect" },
      { name: "511", coords: [0.311, 0.155, 0.359, 0.408], shape: "rect" },
      { name: "510", coords: [0.659, 0.153, 0.706, 0.411], shape: "rect" },
      { name: "509", coords: [0.707, 0.157, 0.754, 0.41], shape: "rect" },
      { name: "508", coords: [0.756, 0.155, 0.803, 0.411], shape: "rect" },
      { name: "507", coords: [0.807, 0.155, 0.854, 0.411], shape: "rect" },
      { name: "506", coords: [0.856, 0.153, 0.902, 0.413], shape: "rect" },
      { name: "505", coords: [0.905, 0.155, 0.955, 0.415], shape: "rect" }
    ]
  },

  법과대학: {
    "2": [
      { name: "207", coords: [0.7430, 0.6100, 0.7785, 0.6767], shape: "rect" },
      { name: "208", coords: [0.7430, 0.5433, 0.7813, 0.6083], shape: "rect" },
      { name: "209", coords: [0.7402, 0.4733, 0.7822, 0.5383], shape: "rect" },
      { name: "210", coords: [0.7430, 0.4033, 0.7813, 0.4683], shape: "rect" },
      { name: "211", coords: [0.7430, 0.3383, 0.7822, 0.4033], shape: "rect" },
      { name: "212", coords: [0.7421, 0.2650, 0.7832, 0.3350], shape: "rect" },
      { name: "204", coords: [0.6280, 0.2650, 0.7290, 0.3300], shape: "rect" },
      { name: "206", coords: [0.7065, 0.2417, 0.7486, 0.2650], shape: "rect" },
    ],
    "3": [
      { name: "317", coords: [0.6192, 0.0317, 0.6813, 0.1817], shape: "rect" },
      { name: "318", coords: [0.5603, 0.0283, 0.6192, 0.1867], shape: "rect" },
      { name: "319", coords: [0.5028, 0.0317, 0.5603, 0.1883], shape: "rect" },
      { name: "320", coords: [0.4430, 0.0283, 0.5028, 0.1883], shape: "rect" },
      { name: "314", coords: [0.6226, 0.2233, 0.6839, 0.3733], shape: "rect" },
      { name: "315", coords: [0.5631, 0.2283, 0.6192, 0.3733], shape: "rect" },
      { name: "316", coords: [0.5028, 0.2283, 0.5631, 0.3717], shape: "rect" },
      { name: "324", coords: [0.1505, 0.0383, 0.2093, 0.1983], shape: "rect" },
      { name: "325", coords: [0.0897, 0.0333, 0.1477, 0.1933], shape: "rect" },
      { name: "330", coords: [0.0327, 0.2583, 0.0897, 0.3733], shape: "rect" },
      { name: "331", coords: [0.0308, 0.3783, 0.0897, 0.4883], shape: "rect" },
      { name: "332", coords: [0.0271, 0.4883, 0.0897, 0.6017], shape: "rect" },
      { name: "333", coords: [0.0271, 0.6033, 0.0897, 0.7133], shape: "rect" },
      { name: "334", coords: [0.0271, 0.7183, 0.0870, 0.8283], shape: "rect" },
      { name: "335", coords: [0.0243, 0.8283, 0.0859, 0.9517], shape: "rect" },
      { name: "336", coords: [0.1093, 0.4817, 0.1811, 0.6367], shape: "rect" },
      { name: "323", coords: [0.1131, 0.8367, 0.1704, 0.9883], shape: "rect" },
      { name: "326", coords: [0.2019, 0.8367, 0.2626, 0.9400], shape: "rect" }
    ],    
    "4": [
      { name: "430", coords: [0.0383, 0.2683, 0.1009, 0.3867], shape: "rect" },
      { name: "431", coords: [0.0383, 0.3883, 0.1028, 0.4983], shape: "rect" },
      { name: "432", coords: [0.0383, 0.5017, 0.1028, 0.6083], shape: "rect" },
      { name: "433", coords: [0.0383, 0.6117, 0.1028, 0.7217], shape: "rect" },
      { name: "434", coords: [0.0383, 0.7283, 0.1028, 0.8333], shape: "rect" },
      { name: "435", coords: [0.0383, 0.8383, 0.1028, 0.9517], shape: "rect" },
      { name: "427", coords: [0.2206, 0.4967, 0.2850, 0.6133], shape: "rect" },
      { name: "428", coords: [0.2206, 0.3833, 0.2827, 0.4933], shape: "rect" },
      { name: "429", coords: [0.2187, 0.2633, 0.2827, 0.3833], shape: "rect" },
      { name: "426", coords: [0.0972, 0.0467, 0.1589, 0.1983], shape: "rect" },
      { name: "425", coords: [0.1589, 0.0433, 0.2206, 0.2017], shape: "rect" },
      { name: "419", coords: [0.6393, 0.0333, 0.7009, 0.1883], shape: "rect" },
      { name: "420", coords: [0.5806, 0.0367, 0.6393, 0.1933], shape: "rect" },
      { name: "421", coords: [0.5196, 0.0383, 0.5766, 0.1933], shape: "rect" },
      { name: "422", coords: [0.4598, 0.0417, 0.5196, 0.1917], shape: "rect" },
      { name: "415", coords: [0.6411, 0.2333, 0.7037, 0.3733], shape: "rect" },
      { name: "416", coords: [0.5785, 0.2333, 0.6393, 0.3817], shape: "rect" },
      { name: "417", coords: [0.5215, 0.2367, 0.5766, 0.3833], shape: "rect" },
      { name: "418", coords: [0.4604, 0.2383, 0.5196, 0.3783], shape: "rect" }
    ],
    "5": [
      { name: "523", coords: [0.0327, 0.2617, 0.0897, 0.3750], shape: "rect" },
      { name: "524", coords: [0.0299, 0.3767, 0.0897, 0.4867], shape: "rect" },
      { name: "525", coords: [0.0271, 0.4917, 0.0897, 0.6000], shape: "rect" },
      { name: "515", coords: [0.1121, 0.8317, 0.1701, 0.9800], shape: "rect" },
      { name: "520", coords: [0.2037, 0.4917, 0.2645, 0.6000], shape: "rect" },
      { name: "521", coords: [0.2037, 0.3717, 0.2654, 0.4867], shape: "rect" },
      { name: "522", coords: [0.2047, 0.2583, 0.2678, 0.3733], shape: "rect" },
      { name: "502", coords: [0.6226, 0.0283, 0.6775, 0.1833], shape: "rect" },
      { name: "503", coords: [0.5603, 0.0283, 0.6192, 0.1867], shape: "rect" },
      { name: "507", coords: [0.4430, 0.2317, 0.5000, 0.3733], shape: "rect" },
      { name: "508", coords: [0.5028, 0.2267, 0.5603, 0.3767], shape: "rect" },
      { name: "509", coords: [0.5631, 0.2233, 0.6192, 0.3717], shape: "rect" },
      { name: "510", coords: [0.6226, 0.2217, 0.6839, 0.3717], shape: "rect" }
    ],
    "6": [
      { name: "612", coords: ["0.2289", "0.4000", "0.2900", "0.5017"], shape: "rect" },
      { name: "613", coords: ["0.2289", "0.2882", "0.2900", "0.3950"], shape: "rect" },
      { name: "607", coords: ["0.2300", "0.0780", "0.2951", "0.2282"], shape: "rect" },
      { name: "608", coords: ["0.1700", "0.0802", "0.2300", "0.2282"], shape: "rect" },
      { name: "609", coords: ["0.1050", "0.0780", "0.1679", "0.2282"], shape: "rect" },
      { name: "615", coords: ["0.0477", "0.2912", "0.1112", "0.3967"], shape: "rect" },
      { name: "616", coords: ["0.0458", "0.3950", "0.1112", "0.4950"], shape: "rect" },
      { name: "617", coords: ["0.0458", "0.5017", "0.1112", "0.6017"], shape: "rect" },
      { name: "618", coords: ["0.0477", "0.6050", "0.1112", "0.7050"], shape: "rect" },
      { name: "619", coords: ["0.0495", "0.7100", "0.1112", "0.8150"], shape: "rect" },
    ],
  },

  반도체대학: {
    "B2": [
      { name: "B201", coords: [0.146, 0.600, 0.209, 0.713], shape: "rect" },
      { name: "B202", coords: [0.341, 0.600, 0.405, 0.757], shape: "rect" },
      { name: "B203", coords: [0.405, 0.597, 0.467, 0.755], shape: "rect" },
      { name: "B204", coords: [0.469, 0.602, 0.533, 0.757], shape: "rect" },
      { name: "B205", coords: [0.534, 0.603, 0.597, 0.757], shape: "rect" },
      { name: "B206", coords: [0.598, 0.602, 0.660, 0.755], shape: "rect" },
      { name: "B207", coords: [0.662, 0.607, 0.726, 0.757], shape: "rect" },
      { name: "B208", coords: [0.788, 0.677, 0.855, 0.797], shape: "rect" },
    ],
    "B1": [
      { name: "B102", coords: [0.321, 0.663, 0.358, 0.825], shape: "rect" },
      { name: "B103", coords: [0.357, 0.660, 0.389, 0.825], shape: "rect" },
      { name: "B104", coords: [0.391, 0.663, 0.421, 0.825], shape: "rect" },
      { name: "B105", coords: [0.422, 0.660, 0.455, 0.823], shape: "rect" },
      { name: "B106", coords: [0.458, 0.665, 0.489, 0.823], shape: "rect" },
      { name: "B107", coords: [0.489, 0.662, 0.521, 0.827], shape: "rect" },
      { name: "B108", coords: [0.521, 0.660, 0.553, 0.825], shape: "rect" },
      { name: "B109", coords: [0.555, 0.665, 0.586, 0.827], shape: "rect" },
      { name: "B110", coords: [0.586, 0.665, 0.620, 0.827], shape: "rect" },
      { name: "B111", coords: [0.620, 0.660, 0.653, 0.823], shape: "rect" },
      { name: "B112", coords: [0.653, 0.662, 0.685, 0.822], shape: "rect" },
      { name: "B113", coords: [0.685, 0.663, 0.750, 0.827], shape: "rect" },
      { name: "B114", coords: [0.751, 0.665, 0.788, 0.825], shape: "rect" },
      { name: "B115", coords: [0.815, 0.740, 0.849, 0.868], shape: "rect" },
      { name: "B101", coords: [0.164, 0.743, 0.223, 0.870], shape: "rect" },
],
    "1": [
      { name: "101-A", coords: [0.274, 0.238, 0.330, 0.385], shape: "rect" },
      { name: "101-B", coords: [0.334, 0.237, 0.422, 0.385], shape: "rect" },
      { name: "102", coords: [0.423, 0.233, 0.454, 0.387], shape: "rect" },
      { name: "103", coords: [0.456, 0.237, 0.514, 0.387], shape: "rect" },
      { name: "104", coords: [0.517, 0.238, 0.607, 0.387], shape: "rect" },
      { name: "106-1", coords: [0.610, 0.285, 0.640, 0.382], shape: "rect" },
      { name: "105", coords: [0.696, 0.290, 0.757, 0.388], shape: "rect" },
      { name: "107", coords: [0.762, 0.437, 0.820, 0.535], shape: "rect" },
      { name: "106-2", coords: [0.730, 0.432, 0.751, 0.532], shape: "rect" },
      { name: "109-1", coords: [0.716, 0.538, 0.820, 0.630], shape: "rect" },
      { name: "109-2", coords: [0.699, 0.678, 0.754, 0.818], shape: "rect" },
      { name: "116", coords: [0.210, 0.435, 0.271, 0.527], shape: "rect" },
      { name: "115", coords: [0.210, 0.532, 0.272, 0.610], shape: "rect" },
      { name: "117", coords: [0.303, 0.430, 0.393, 0.623], shape: "rect" },
      { name: "118", coords: [0.423, 0.432, 0.512, 0.627], shape: "rect" },
      { name: "114", coords: [0.271, 0.750, 0.327, 0.820], shape: "rect" },
      { name: "113", coords: [0.333, 0.677, 0.512, 0.818], shape: "rect" },
      { name: "112-B", coords: [0.517, 0.673, 0.576, 0.820], shape: "rect" },
      { name: "112-A", coords: [0.577, 0.673, 0.605, 0.818], shape: "rect" },
      { name: "111", coords: [0.607, 0.672, 0.635, 0.822], shape: "rect" },
      { name: "110", coords: [0.638, 0.670, 0.697, 0.825], shape: "rect" },
      { name: "119", coords: [0.758, 0.747, 0.820, 0.818], shape: "rect" },
    ],
    "2": [
      { name: "201", coords: [0.233, 0.147, 0.299, 0.330], shape: "rect" },
      { name: "202", coords: [0.303, 0.148, 0.403, 0.330], shape: "rect" },
      { name: "203", coords: [0.406, 0.152, 0.439, 0.330], shape: "rect" },
      { name: "204-A", coords: [0.440, 0.148, 0.507, 0.332], shape: "rect" },
      { name: "204", coords: [0.508, 0.148, 0.542, 0.330], shape: "rect" },
      { name: "205", coords: [0.543, 0.150, 0.649, 0.328], shape: "rect" },
      { name: "235", coords: [0.650, 0.242, 0.713, 0.330], shape: "rect" },
      { name: "206", coords: [0.716, 0.168, 0.785, 0.330], shape: "rect" },
      { name: "207", coords: [0.819, 0.170, 0.853, 0.328], shape: "rect" },
      { name: "221", coords: [0.161, 0.380, 0.233, 0.423], shape: "rect" },
      { name: "220", coords: [0.163, 0.425, 0.233, 0.622], shape: "rect" },
      { name: "211-A", coords: [0.268, 0.487, 0.367, 0.592], shape: "rect" },
      { name: "211-2", coords: [0.268, 0.380, 0.367, 0.482], shape: "rect" },
      { name: "233", coords: [0.369, 0.378, 0.504, 0.587], shape: "rect" },
      { name: "210", coords: [0.751, 0.378, 0.856, 0.588], shape: "rect" },
      { name: "223-A", coords: [0.300, 0.638, 0.334, 0.818], shape: "rect" },
      { name: "223-B", coords: [0.336, 0.637, 0.369, 0.818], shape: "rect" },
      { name: "224", coords: [0.373, 0.637, 0.439, 0.817], shape: "rect" },
      { name: "225", coords: [0.440, 0.640, 0.473, 0.822], shape: "rect" },
      { name: "226", coords: [0.474, 0.633, 0.507, 0.818], shape: "rect" },
      { name: "227", coords: [0.508, 0.637, 0.576, 0.820], shape: "rect" },
      { name: "229", coords: [0.577, 0.635, 0.599, 0.818], shape: "rect" },
      { name: "230", coords: [0.602, 0.637, 0.646, 0.818], shape: "rect" },
      { name: "231-A", coords: [0.649, 0.637, 0.680, 0.820], shape: "rect" },
      { name: "231-B", coords: [0.680, 0.635, 0.714, 0.820], shape: "rect" },
      { name: "232", coords: [0.714, 0.637, 0.782, 0.820], shape: "rect" },
    ],
    "3": [
      { name: "301", coords: [0.169, 0.100, 0.248, 0.290], shape: "rect" },
      { name: "302", coords: [0.251, 0.100, 0.333, 0.290], shape: "rect" },
      { name: "303", coords: [0.334, 0.102, 0.412, 0.292], shape: "rect" },
      { name: "304", coords: [0.414, 0.100, 0.495, 0.290], shape: "rect" },
      { name: "305", coords: [0.496, 0.100, 0.626, 0.287], shape: "rect" },
      { name: "305-A", coords: [0.626, 0.097, 0.663, 0.287], shape: "rect" },
      { name: "320", coords: [0.665, 0.200, 0.738, 0.290], shape: "rect" },
      { name: "306-A", coords: [0.740, 0.118, 0.784, 0.293], shape: "rect" },
      { name: "306-B", coords: [0.784, 0.118, 0.824, 0.292], shape: "rect" },
      { name: "307-A", coords: [0.824, 0.117, 0.864, 0.288], shape: "rect" },
      { name: "307-B", coords: [0.865, 0.113, 0.907, 0.288], shape: "rect" },
      { name: "308", coords: [0.846, 0.345, 0.907, 0.415], shape: "rect" },
      { name: "309-A", coords: [0.847, 0.423, 0.908, 0.492], shape: "rect" },
      { name: "309-B", coords: [0.846, 0.495, 0.908, 0.563], shape: "rect" },
      { name: "319", coords: [0.620, 0.343, 0.821, 0.565], shape: "rect" },
      { name: "318", coords: [0.247, 0.342, 0.490, 0.562], shape: "rect" },
      { name: "317", coords: [0.083, 0.460, 0.167, 0.623], shape: "rect" },
      { name: "316", coords: [0.247, 0.618, 0.329, 0.812], shape: "rect" },
      { name: "315", coords: [0.333, 0.615, 0.413, 0.808], shape: "rect" },
      { name: "314", coords: [0.414, 0.617, 0.493, 0.810], shape: "rect" },
      { name: "313", coords: [0.498, 0.618, 0.576, 0.808], shape: "rect" },
      { name: "312", coords: [0.579, 0.617, 0.659, 0.812], shape: "rect" },
      { name: "311", coords: [0.662, 0.615, 0.741, 0.812], shape: "rect" },
      { name: "310", coords: [0.743, 0.615, 0.785, 0.813], shape: "rect" },
      { name: "309", coords: [0.785, 0.617, 0.821, 0.808], shape: "rect" },
    ],
    "4": [
      { name: "401", coords: [0.179, 0.163, 0.216, 0.345], shape: "rect" },
      { name: "402", coords: [0.218, 0.163, 0.257, 0.350], shape: "rect" },
      { name: "403", coords: [0.260, 0.163, 0.336, 0.347], shape: "rect" },
      { name: "404", coords: [0.340, 0.163, 0.417, 0.347], shape: "rect" },
      { name: "405", coords: [0.420, 0.163, 0.497, 0.350], shape: "rect" },
      { name: "406", coords: [0.527, 0.163, 0.556, 0.313], shape: "rect" },
      { name: "407-A", coords: [0.580, 0.162, 0.621, 0.350], shape: "rect" },
      { name: "407-B", coords: [0.622, 0.165, 0.664, 0.343], shape: "rect" },
      { name: "422", coords: [0.665, 0.258, 0.738, 0.345], shape: "rect" },
      { name: "408", coords: [0.740, 0.183, 0.821, 0.348], shape: "rect" },
      { name: "409", coords: [0.824, 0.182, 0.906, 0.345], shape: "rect" },
      { name: "410", coords: [0.826, 0.400, 0.905, 0.505], shape: "rect" },
      { name: "421", coords: [0.622, 0.397, 0.676, 0.612], shape: "rect" },
      { name: "420", coords: [0.260, 0.397, 0.497, 0.607], shape: "rect" },
      { name: "411", coords: [0.821, 0.510, 0.907, 0.608], shape: "rect" },
      { name: "419-1", coords: [0.181, 0.398, 0.235, 0.658], shape: "rect" },
      { name: "419", coords: [0.095, 0.398, 0.179, 0.507], shape: "rect" },
      { name: "418", coords: [0.256, 0.682, 0.335, 0.857], shape: "rect" },
      { name: "417-A", coords: [0.337, 0.683, 0.378, 0.847], shape: "rect" },
      { name: "417-B", coords: [0.379, 0.685, 0.417, 0.845], shape: "rect" },
      { name: "416-A", coords: [0.417, 0.685, 0.461, 0.845], shape: "rect" },
      { name: "416-B", coords: [0.461, 0.685, 0.497, 0.845], shape: "rect" },
      { name: "415-A", coords: [0.497, 0.683, 0.539, 0.843], shape: "rect" },
      { name: "415-B", coords: [0.541, 0.687, 0.578, 0.848], shape: "rect" },
      { name: "414-A", coords: [0.579, 0.687, 0.621, 0.843], shape: "rect" },
      { name: "414-B", coords: [0.622, 0.680, 0.663, 0.842], shape: "rect" },
      { name: "413", coords: [0.663, 0.682, 0.740, 0.842], shape: "rect" },
      { name: "412", coords: [0.741, 0.685, 0.821, 0.847], shape: "rect" },
    ],
    "5": [
      { name: "501", coords: [0.181, 0.160, 0.250, 0.342], shape: "rect" },
      { name: "502", coords: [0.253, 0.163, 0.326, 0.338], shape: "rect" },
      { name: "503", coords: [0.327, 0.160, 0.476, 0.338], shape: "rect" },
      { name: "504", coords: [0.478, 0.160, 0.628, 0.338], shape: "rect" },
      { name: "504-1", coords: [0.629, 0.250, 0.698, 0.338], shape: "rect" },
      { name: "505", coords: [0.699, 0.178, 0.776, 0.338], shape: "rect" },
      { name: "506", coords: [0.776, 0.178, 0.851, 0.340], shape: "rect" },
      { name: "507", coords: [0.774, 0.390, 0.852, 0.495], shape: "rect" },
      { name: "508", coords: [0.774, 0.490, 0.852, 0.600], shape: "rect" },
      { name: "510", coords: [0.101, 0.388, 0.215, 0.493], shape: "rect" },
      { name: "511", coords: [0.098, 0.493, 0.212, 0.648], shape: "rect" },
    ],
    "6": [
      { name: "601", coords: [0.188, 0.142, 0.263, 0.318], shape: "rect" },
      { name: "602", coords: [0.265, 0.138, 0.341, 0.318], shape: "rect" },
      { name: "603", coords: [0.344, 0.142, 0.421, 0.322], shape: "rect" },
      { name: "604", coords: [0.422, 0.137, 0.498, 0.322], shape: "rect" },
      { name: "605", coords: [0.501, 0.138, 0.576, 0.322], shape: "rect" },
      { name: "606", coords: [0.579, 0.138, 0.657, 0.322], shape: "rect" },
      { name: "607-A", coords: [0.736, 0.158, 0.771, 0.268], shape: "rect" },
      { name: "607-B", coords: [0.774, 0.158, 0.811, 0.262], shape: "rect" },
      { name: "608-A", coords: [0.814, 0.153, 0.850, 0.268], shape: "rect" },
      { name: "608-B", coords: [0.853, 0.153, 0.893, 0.268], shape: "rect" },
      { name: "609-A", coords: [0.831, 0.375, 0.892, 0.440], shape: "rect" },
      { name: "609-B", coords: [0.833, 0.450, 0.892, 0.520], shape: "rect" },
      { name: "609-C", coords: [0.831, 0.522, 0.893, 0.587], shape: "rect" },
      { name: "612-1", coords: [0.186, 0.375, 0.234, 0.480], shape: "rect" },
      { name: "612-2", coords: [0.105, 0.375, 0.182, 0.475], shape: "rect" },
      { name: "614", coords: [0.660, 0.228, 0.730, 0.322], shape: "rect" },
    ],
  },
  글로벌센터: {
    "1": [
      { name: "105", coords: [0.149, 0.107, 0.255, 0.257], shape: "rect" },
      { name: "104", coords: [0.149, 0.262, 0.255, 0.41], shape: "rect" },
      { name: "103", coords: [0.149, 0.413, 0.257, 0.558], shape: "rect" },
      { name: "113", coords: [0.725, 0.158, 0.87, 0.252], shape: "rect" },
      { name: "112", coords: [0.724, 0.257, 0.869, 0.408], shape: "rect" },
      { name: "111", coords: [0.725, 0.413, 0.869, 0.563], shape: "rect" },
      { name: "110", coords: [0.725, 0.568, 0.872, 0.645], shape: "rect" },
      { name: "109", coords: [0.725, 0.65, 0.872, 0.873], shape: "rect" },
      { name: "102-2", coords: [0.149, 0.57, 0.255, 0.635], shape: "rect" },
      { name: "102-1", coords: [0.149, 0.642, 0.254, 0.71], shape: "rect" },
      { name: "101", coords: [0.149, 0.72, 0.288, 0.918], shape: "rect" },
      { name: "100", coords: [0.397, 0.267, 0.623, 0.57], shape: "rect" },
    ],
    "2": [
      { name: "206", coords: [0.168, 0.118, 0.269, 0.267], shape: "rect" },
      { name: "217", coords: [0.508, 0.172, 0.635, 0.34], shape: "rect" },
      { name: "216", coords: [0.733, 0.167, 0.878, 0.258], shape: "rect" },
      { name: "205", coords: [0.166, 0.272, 0.269, 0.415], shape: "rect" },
      { name: "215", coords: [0.733, 0.268, 0.879, 0.417], shape: "rect" },
      { name: "204", coords: [0.169, 0.423, 0.269, 0.56], shape: "rect" },
      { name: "214", coords: [0.732, 0.42, 0.878, 0.565], shape: "rect" },
      { name: "211", coords: [0.308, 0.417, 0.411, 0.562], shape: "rect" },
      { name: "203", coords: [0.168, 0.567, 0.269, 0.715], shape: "rect" },
      { name: "210", coords: [0.308, 0.572, 0.411, 0.71], shape: "rect" },
      { name: "213", coords: [0.733, 0.568, 0.88, 0.712], shape: "rect" },
      { name: "202", coords: [0.166, 0.72, 0.271, 0.86], shape: "rect" },
      { name: "209", coords: [0.308, 0.712, 0.414, 0.862], shape: "rect" },
      { name: "212", coords: [0.732, 0.718, 0.879, 0.867], shape: "rect" },
      { name: "201", coords: [0.174, 0.868, 0.269, 0.913], shape: "rect" },
      { name: "207", coords: [0.31, 0.867, 0.412, 0.912], shape: "rect" },
    ],
    "3": [
      { name: "305", coords: [0.166, 0.1, 0.268, 0.253], shape: "rect" },
      { name: "320", coords: [0.643, 0.16, 0.703, 0.198], shape: "rect" },
      { name: "313", coords: [0.745, 0.158, 0.887, 0.255], shape: "rect" },
      { name: "304", coords: [0.169, 0.263, 0.265, 0.407], shape: "rect" },
      { name: "312", coords: [0.744, 0.26, 0.886, 0.398], shape: "rect" },
      { name: "303", coords: [0.166, 0.412, 0.266, 0.558], shape: "rect" },
      { name: "308", coords: [0.306, 0.407, 0.414, 0.562], shape: "rect" },
      { name: "311", coords: [0.745, 0.405, 0.887, 0.56], shape: "rect" },
      { name: "302", coords: [0.165, 0.563, 0.266, 0.71], shape: "rect" },
      { name: "307", coords: [0.306, 0.567, 0.418, 0.712], shape: "rect" },
      { name: "310", coords: [0.745, 0.565, 0.886, 0.708], shape: "rect" },
      { name: "301", coords: [0.166, 0.718, 0.266, 0.868], shape: "rect" },
      { name: "306", coords: [0.306, 0.72, 0.414, 0.872], shape: "rect" },
      { name: "309", coords: [0.747, 0.718, 0.886, 0.87], shape: "rect" },
    ],
    "4": [
      { name: "403", coords: [0.111, 0.146, 0.217, 0.293], shape: "rect" },
      { name: "402", coords: [0.100, 0.295, 0.217, 0.580], shape: "rect" },
      { name: "408", coords: [0.257, 0.435, 0.361, 0.580], shape: "rect" },
      { name: "401", coords: [0.102, 0.583, 0.216, 0.870], shape: "rect" },
      { name: "407", coords: [0.257, 0.583, 0.361, 0.721], shape: "rect" },
      { name: "406", coords: [0.257, 0.723, 0.363, 0.870], shape: "rect" },
      { name: "409", coords: [0.697, 0.587, 0.851, 0.896], shape: "rect" }
    ],
    "5": [
      { name: "505", coords: [0.127, 0.097, 0.233, 0.250], shape: "rect" },
      { name: "504", coords: [0.114, 0.253, 0.234, 0.395], shape: "rect" },
      { name: "513", coords: [0.725, 0.398, 0.878, 0.483], shape: "rect" },
      { name: "512", coords: [0.725, 0.489, 0.888, 0.574], shape: "rect" },
      { name: "503", coords: [0.114, 0.403, 0.233, 0.547], shape: "rect" },
      { name: "508", coords: [0.273, 0.398, 0.385, 0.544], shape: "rect" },
      { name: "502", coords: [0.114, 0.554, 0.233, 0.700], shape: "rect" },
      { name: "507", coords: [0.273, 0.554, 0.385, 0.700], shape: "rect" },
      { name: "511", coords: [0.725, 0.578, 0.888, 0.700], shape: "rect" },
      { name: "501", coords: [0.113, 0.707, 0.234, 0.860], shape: "rect" },
      { name: "506", coords: [0.273, 0.707, 0.385, 0.860], shape: "rect" },
      { name: "509", coords: [0.725, 0.777, 0.891, 0.880], shape: "rect" },
      { name: "510", coords: [0.725, 0.704, 0.889, 0.774], shape: "rect" }
    ],
    "6": [
      { name: "608", coords: [0.122, 0.088, 0.225, 0.142], shape: "rect" },
      { name: "607", coords: [0.107, 0.146, 0.226, 0.246], shape: "rect" },
      { name: "606", coords: [0.107, 0.248, 0.226, 0.340], shape: "rect" },
      { name: "605", coords: [0.107, 0.342, 0.226, 0.461], shape: "rect" },
      { name: "604", coords: [0.107, 0.465, 0.226, 0.562], shape: "rect" },
      { name: "617", coords: [0.708, 0.244, 0.862, 0.397], shape: "rect" },
      { name: "612", coords: [0.266, 0.408, 0.377, 0.520], shape: "rect" },
      { name: "618", coords: [0.708, 0.412, 0.862, 0.564], shape: "rect" },
      { name: "603", coords: [0.107, 0.572, 0.226, 0.721], shape: "rect" },
      { name: "611", coords: [0.268, 0.524, 0.375, 0.647], shape: "rect" },
      { name: "618-1", coords: [0.603, 0.568, 0.669, 0.723], shape: "rect" },
      { name: "618-2", coords: [0.706, 0.572, 0.863, 0.725], shape: "rect" },
      { name: "618-3", coords: [0.603, 0.729, 0.863, 0.903], shape: "rect" },
      { name: "610", coords: [0.266, 0.651, 0.375, 0.770], shape: "rect" },
      { name: "609", coords: [0.265, 0.777, 0.375, 0.880], shape: "rect" },
      { name: "602", coords: [0.107, 0.729, 0.225, 0.830], shape: "rect" },
      { name: "601", coords: [0.122, 0.835, 0.225, 0.880], shape: "rect" }
    ]
  },

  공과대학1: {
    "B1": [
      { name: "B101", coords: [0.341176, 0.175, 0.428037, 0.34], shape: "rect" },
      { name: "B102", coords: [0.32, 0.346667, 0.424299, 0.538333], shape: "rect" }
    ],
    "1": [
      { name: "101", coords: [0.125234, 0.166667, 0.205607, 0.363333], shape: "rect" },
      { name: "101-A", coords: [0.126168, 0.366667, 0.206542, 0.433333], shape: "rect" },
      { name: "102-1", coords: [0.288785, 0.433333, 0.316822, 0.581667], shape: "rect" },
      { name: "102-2", coords: [0.32, 0.433333, 0.346729, 0.588333], shape: "rect" },
      { name: "102-3", coords: [0.350467, 0.433333, 0.378505, 0.593333], shape: "rect" },
      { name: "103-1", coords: [0.381308, 0.44, 0.41215, 0.593333], shape: "rect" },
      { name: "103-2", coords: [0.414953, 0.436667, 0.4430, 0.59], shape: "rect" },
      { name: "103-3", coords: [0.446729, 0.433333, 0.474766, 0.581667], shape: "rect" },
      { name: "104", coords: [0.473832, 0.441667, 0.569159, 0.54], shape: "rect" },
      { name: "105", coords: [0.516822, 0.313333, 0.61215, 0.433333], shape: "rect" },
      { name: "123-A", coords: [0.209346, 0.153333, 0.261682, 0.275], shape: "rect" },
      { name: "123-B", coords: [0.264486, 0.153333, 0.285981, 0.258333], shape: "rect" },
      { name: "120~121", coords: [0.338318, 0.301667, 0.424299, 0.363333], shape: "rect" },
      { name: "119", coords: [0.421495, 0.313333, 0.473832, 0.368333], shape: "rect" },
      { name: "117", coords: [0.428037, 0.126667, 0.519626, 0.253333], shape: "rect" },
      { name: "116", coords: [0.519626, 0.131667, 0.61215, 0.258333], shape: "rect" },
      { name: "115", coords: [0.614953, 0.126667, 0.711215, 0.253333], shape: "rect" },
      { name: "114", coords: [0.885981, 0.131667, 0.93271, 0.308333], shape: "rect" },
      { name: "113-1", coords: [0.84, 0.313333, 0.931776, 0.433333], shape: "rect" },
      { name: "113", coords: [0.843925, 0.44, 0.93271, 0.566667], shape: "rect" },
      { name: "112", coords: [0.841121, 0.573333, 0.933645, 0.628333], shape: "rect" },
      { name: "111", coords: [0.84, 0.633333, 0.931776, 0.958333], shape: "rect" },
      { name: "110", coords: [0.711215, 0.83, 0.837383, 0.961667], shape: "rect" },
      { name: "109", coords: [0.71028, 0.765, 0.802804, 0.825], shape: "rect" },
      { name: "108", coords: [0.707477, 0.698333, 0.802804, 0.758333], shape: "rect" },
      { name: "107", coords: [0.707477, 0.566667, 0.802804, 0.691667], shape: "rect" },
      { name: "106", coords: [0.71028, 0.44, 0.802804, 0.56], shape: "rect" }
    ],
    "2": [
      { name: "201", coords: [0.115888, 0.136667, 0.216822, 0.296667], shape: "rect" },
      { name: "219-A", coords: [0.22, 0.098333, 0.256075, 0.191667], shape: "rect" },
      { name: "219-B", coords: [0.260748, 0.098333, 0.292523, 0.191667], shape: "rect" },
      { name: "220-A", coords: [0.218692, 0.241667, 0.25514, 0.351667], shape: "rect" },
      { name: "220-B", coords: [0.26, 0.241667, 0.296262, 0.351667], shape: "rect" },
      { name: "218", coords: [0.433645, 0.076667, 0.571963, 0.191667], shape: "rect" },
      { name: "217", coords: [0.575701, 0.076667, 0.614953, 0.191667], shape: "rect" },
      { name: "216", coords: [0.618692, 0.076667, 0.713084, 0.186667], shape: "rect" },
      { name: "215", coords: [0.840187, 0.076667, 0.928972, 0.236667], shape: "rect" },
      { name: "214", coords: [0.837383, 0.241667, 0.928972, 0.351667], shape: "rect" },
      { name: "213", coords: [0.840187, 0.356667, 0.928972, 0.466667], shape: "rect" },
      { name: "212", coords: [0.835514, 0.471667, 0.927103, 0.586667], shape: "rect" },
      { name: "211", coords: [0.835514, 0.595, 0.928037, 0.705], shape: "rect" },
      { name: "210", coords: [0.840187, 0.708333, 0.907477, 0.758333], shape: "rect" },
      { name: "202-1", coords: [0.295327, 0.39, 0.326168, 0.5], shape: "rect" },
      { name: "202-2", coords: [0.329907, 0.39, 0.356075, 0.51], shape: "rect" },
      { name: "202-3", coords: [0.356075, 0.39, 0.385047, 0.511667], shape: "rect" },
      { name: "203-1", coords: [0.38785, 0.39, 0.418692, 0.511667], shape: "rect" },
      { name: "203-2", coords: [0.418692, 0.391667, 0.4458, 0.511667], shape: "rect" },
      { name: "203-3", coords: [0.45, 0.353333, 0.479439, 0.496667], shape: "rect" },
      { name: "204", coords: [0.483178, 0.39, 0.569159, 0.461667], shape: "rect" },
      { name: "205", coords: [0.526168, 0.241667, 0.614953, 0.385], shape: "rect" },
      { name: "206-1", coords: [0.618692, 0.236667, 0.661682, 0.385], shape: "rect" },
      { name: "206-2", coords: [0.661682, 0.241667, 0.708411, 0.368333], shape: "rect" },
      { name: "207-A", coords: [0.713084, 0.356667, 0.802804, 0.39], shape: "rect" },
      { name: "207-B", coords: [0.711215, 0.395, 0.80, 0.466667], shape: "rect" },
      { name: "208", coords: [0.711215, 0.473333, 0.8, 0.643333], shape: "rect" },
      { name: "209", coords: [0.713084, 0.648333, 0.802804, 0.818333], shape: "rect" }
    ],
   "3": [
      { name: "301", coords: [0.06729, 0.17, 0.18785, 0.351667], shape: "rect" },
      { name: "321-A", coords: [0.190654, 0.126667, 0.228037, 0.225], shape: "rect" },
      { name: "321-B", coords: [0.230841, 0.126667, 0.271028, 0.225], shape: "rect" },
      { name: "320-2", coords: [0.421495, 0.105, 0.46729, 0.225], shape: "rect" },
      { name: "320-1", coords: [0.471028, 0.105, 0.519626, 0.23], shape: "rect" },
      { name: "319", coords: [0.523364, 0.105, 0.618692, 0.23], shape: "rect" },
      { name: "318-A", coords: [0.620561, 0.098333, 0.666355, 0.23], shape: "rect" },
      { name: "318-B", coords: [0.671028, 0.098333, 0.719626, 0.23], shape: "rect" },
      { name: "317-A", coords: [0.766355, 0.098333, 0.818692, 0.23], shape: "rect" },
      { name: "317", coords: [0.856075, 0.103333, 0.95514, 0.278333], shape: "rect" },
      { name: "316", coords: [0.856075, 0.286667, 0.95514, 0.413333], shape: "rect" },
      { name: "315", coords: [0.858, 0.418333, 0.954206, 0.538333], shape: "rect" },
      { name: "314", coords: [0.857009, 0.55, 0.954206, 0.67], shape: "rect" },
      { name: "313", coords: [0.858, 0.675, 0.957009, 0.801667], shape: "rect" },
      { name: "312", coords: [0.857009, 0.806667, 0.954206, 0.933333], shape: "rect" },
      { name: "311", coords: [0.723364, 0.808333, 0.818692, 0.935], shape: "rect" },
      { name: "310", coords: [0.723364, 0.67, 0.818692, 0.801667], shape: "rect" },
      { name: "309", coords: [0.719626, 0.55, 0.818692, 0.67], shape: "rect" },
      { name: "308", coords: [0.723364, 0.418333, 0.818692, 0.538333], shape: "rect" },
      { name: "307-1", coords: [0.618692, 0.285, 0.685047, 0.45], shape: "rect" },
      { name: "307-2", coords: [0.685047, 0.285, 0.719626, 0.411667], shape: "rect" },
      { name: "306", coords: [0.523364, 0.285, 0.614953, 0.473333], shape: "rect" },
      { name: "305", coords: [0.471028, 0.411667, 0.519626, 0.55], shape: "rect" },
      { name: "304-1", coords: [0.371028, 0.45, 0.402804, 0.588333], shape: "rect" },
      { name: "304-2", coords: [0.406542, 0.45, 0.437383, 0.581667], shape: "rect" },
      { name: "304-3", coords: [0.439252, 0.411667, 0.46729, 0.571667], shape: "rect" },
      { name: "303-3", coords: [0.338318, 0.411667, 0.369159, 0.588333], shape: "rect" },
      { name: "303-2", coords: [0.307477, 0.45, 0.335514, 0.588333], shape: "rect" },
      { name: "303-1", coords: [0.273832, 0.45, 0.304673, 0.571667], shape: "rect" },
      { name: "302", coords: [0.159813, 0.418333, 0.273832, 0.521667], shape: "rect" },
      { name: "322", coords: [0.190654, 0.285, 0.242991, 0.411667], shape: "rect" }
    ],
    "4": [
      { name: "417", coords: [0.2, 0.126667, 0.276636, 0.23], shape: "rect" },
      { name: "416-1", coords: [0.418692, 0.105, 0.461682, 0.225], shape: "rect" },
      { name: "416-2", coords: [0.462617, 0.105, 0.509346, 0.225], shape: "rect" },
      { name: "415-1", coords: [0.514019, 0.098333, 0.541121, 0.225], shape: "rect" },
      { name: "415-2", coords: [0.54486, 0.098333, 0.572991, 0.225], shape: "rect" },
      { name: "415-3", coords: [0.575794, 0.098333, 0.606542, 0.225], shape: "rect" },
      { name: "414-1", coords: [0.608411, 0.098333, 0.637383, 0.225], shape: "rect" },
      { name: "414-2", coords: [0.640187, 0.098333, 0.701869, 0.225], shape: "rect" },
      { name: "413", coords: [0.830841, 0.165, 0.892523, 0.225], shape: "rect" },
      { name: "401-1", coords: [0.2, 0.28, 0.276636, 0.395], shape: "rect" },
      { name: "401-2", coords: [0.280374, 0.275, 0.323364, 0.395], shape: "rect" },
      { name: "402-A", coords: [0.326168, 0.28, 0.369159, 0.373333], shape: "rect" },
      { name: "402-B", coords: [0.371028, 0.28, 0.414019, 0.373333], shape: "rect" },
      { name: "403-1", coords: [0.420561, 0.28, 0.463551, 0.378333], shape: "rect" },
      { name: "403-2", coords: [0.46729, 0.28, 0.511215, 0.378333], shape: "rect" },
      { name: "404-1", coords: [0.514019, 0.275, 0.541121, 0.395], shape: "rect" },
      { name: "404-2", coords: [0.54486, 0.275, 0.572991, 0.395], shape: "rect" },
      { name: "404-3", coords: [0.575794, 0.275, 0.606542, 0.395], shape: "rect" },
      { name: "405-1", coords: [0.609346, 0.28, 0.636449, 0.395], shape: "rect" },
      { name: "405-2", coords: [0.64, 0.28, 0.66729, 0.4], shape: "rect" },
      { name: "405-3", coords: [0.671028, 0.275, 0.698131, 0.395], shape: "rect" },
      { name: "412-1", coords: [0.830841, 0.281667, 0.923364, 0.396667], shape: "rect" },
      { name: "412-2", coords: [0.830841, 0.4, 0.941121, 0.521667], shape: "rect" },
      { name: "412-3", coords: [0.830841, 0.526667, 0.935514, 0.646667], shape: "rect" },
      { name: "411", coords: [0.830841, 0.655, 0.923364, 0.775], shape: "rect" },
      { name: "410", coords: [0.830841, 0.78, 0.923364, 0.901667], shape: "rect" },
      { name: "409", coords: [0.701869, 0.78, 0.793458, 0.901667], shape: "rect" },
      { name: "408-A", coords: [0.700935, 0.655, 0.793458, 0.715], shape: "rect" },
      { name: "408-B", coords: [0.700935, 0.721667, 0.793458, 0.775], shape: "rect" },
      { name: "407-A", coords: [0.701869, 0.526667, 0.793458, 0.588333], shape: "rect" },
      { name: "407-B", coords: [0.701869, 0.593333, 0.794393, 0.653333], shape: "rect" },
      { name: "406-1", coords: [0.701869, 0.401667, 0.793458, 0.461667], shape: "rect" },
      { name: "406-2", coords: [0.701869, 0.466667, 0.793458, 0.521667], shape: "rect" }
    ],
    "5": [
      { name: "511", coords: [0.837383, 0.105, 0.928972, 0.275], shape: "rect" },
      { name: "510", coords: [0.837383, 0.281667, 0.93271, 0.401667], shape: "rect" },
      { name: "509-D", coords: [0.838318, 0.406667, 0.950467, 0.46667], shape: "rect" },
      { name: "509-C", coords: [0.837383, 0.471667, 0.950467, 0.526667], shape: "rect" },
      { name: "509-B", coords: [0.836449, 0.538333, 0.94486, 0.593333], shape: "rect" },
      { name: "509-A", coords: [0.836449, 0.6, 0.94486, 0.66], shape: "rect" },
      { name: "508", coords: [0.704673, 0.791667, 0.928037, 0.913333], shape: "rect" },
      { name: "508-A", coords: [0.704673, 0.66, 0.797196, 0.72], shape: "rect" },
      { name: "508-B", coords: [0.837383, 0.658333, 0.928972, 0.718333, 0.754206, 0.846667], shape: "poly" },
      { name: "508-C", coords: [0.837383, 0.725, 0.928972, 0.785], shape: "rect" },
      { name: "507", coords: [0.701869, 0.463333, 0.797196, 0.655], shape: "rect" },
      { name: "506-1", coords: [0.703738, 0.406667, 0.796262, 0.456667], shape: "rect" },
      { name: "505-3", coords: [0.674766, 0.278333, 0.705607, 0.405], shape: "rect" },
      { name: "505-2", coords: [0.640187, 0.28, 0.66729, 0.401667], shape: "rect" },
      { name: "505-1", coords: [0.606542, 0.28, 0.636449, 0.401667], shape: "rect" },
      { name: "513-3", coords: [0.674766, 0.103333, 0.705607, 0.225], shape: "rect" },
      { name: "513-2", coords: [0.640187, 0.103333, 0.66729, 0.223333], shape: "rect" },
      { name: "513-1", coords: [0.609346, 0.1, 0.636449, 0.225], shape: "rect" },
      { name: "514-3", coords: [0.575794, 0.098333, 0.606542, 0.225], shape: "rect" },
      { name: "514-2", coords: [0.54486, 0.098333, 0.572991, 0.225], shape: "rect" },
      { name: "514-1", coords: [0.514019, 0.098333, 0.541121, 0.225], shape: "rect" },
      { name: "515-3", coords: [0.480374, 0.1, 0.511215, 0.225], shape: "rect" },
      { name: "515-2", coords: [0.439252, 0.105, 0.471028, 0.226667], shape: "rect" },
      { name: "515-1", coords: [0.414019, 0.105, 0.437383, 0.226667], shape: "rect" },
      { name: "504-3", coords: [0.575794, 0.28, 0.606542, 0.401667], shape: "rect" },
      { name: "504-2", coords: [0.54486, 0.28, 0.572991, 0.4], shape: "rect" },
      { name: "504-1", coords: [0.514019, 0.28, 0.541121, 0.401667], shape: "rect" },
      { name: "503-3", coords: [0.479439, 0.28, 0.507477, 0.401667], shape: "rect" },
      { name: "503-2", coords: [0.45, 0.28, 0.47757, 0.401667], shape: "rect" },
      { name: "503-1", coords: [0.414019, 0.28, 0.446729, 0.401667], shape: "rect" },
      { name: "502-3", coords: [0.385047, 0.28, 0.414019, 0.401667], shape: "rect" },
      { name: "502-2", coords: [0.354206, 0.28, 0.381308, 0.406667], shape: "rect" },
      { name: "502-1", coords: [0.32, 0.28, 0.350467, 0.401667], shape: "rect" },
      { name: "501-3", coords: [0.273832, 0.28, 0.32, 0.401667], shape: "rect" },
      { name: "501-2", coords: [0.233645, 0.28, 0.271028, 0.401667], shape: "rect" },
      { name: "501-1", coords: [0.190654, 0.278333, 0.228037, 0.405], shape: "rect" },
      { name: "516-1", coords: [0.233645, 0.126667, 0.271028, 0.225], shape: "rect" },
      { name: "516-2", coords: [0.191589, 0.126667, 0.226168, 0.225], shape: "rect" }
    ],
    "6": [
      { name: "612", coords: [0.288785, 0.126667, 0.319626, 0.22], shape: "rect" },
      { name: "611", coords: [0.324299, 0.105, 0.65514, 0.215], shape: "rect" },
      { name: "610-A", coords: [0.837383, 0.093333, 0.93271, 0.215], shape: "rect" },
      { name: "610-B", coords: [0.852336, 0.218333, 0.935514, 0.306667], shape: "rect" },
      { name: "605-1", coords: [0.657009, 0.291667, 0.692523, 0.368333], shape: "rect" },
      { name: "604", coords: [0.594393, 0.291667, 0.656075, 0.39], shape: "rect" },
      { name: "605-2", coords: [0.694393, 0.401667, 0.793458, 0.526667], shape: "rect" },
      { name: "609-A", coords: [0.833645, 0.403333, 0.935514, 0.461667], shape: "rect" },
      { name: "609-B", coords: [0.833645, 0.466667, 0.93271, 0.521667], shape: "rect" },
      { name: "609-C", coords: [0.837383, 0.533333, 0.93271, 0.653333], shape: "rect" },
      { name: "606", coords: [0.694393, 0.533333, 0.793458, 0.785], shape: "rect" },
      { name: "608-A", coords: [0.837383, 0.665, 0.935514, 0.785], shape: "rect" },
      { name: "608-B", coords: [0.837383, 0.791667, 0.935514, 0.918333], shape: "rect" },
      { name: "607", coords: [0.697196, 0.791667, 0.793458, 0.851667], shape: "rect" }
    ],
    "7": [
      { name: "701", coords: [0.341, 0.402, 0.341, 0.298, 0.368, 0.288, 0.404, 0.283], shape: "rect" },
      { name: "702", coords: [0.405, 0.28, 0.405, 0.398, 0.433, 0.398, 0.435, 0.27], shape: "rect" },
      { name: "709-B", coords: [0.835, 0.793, 0.931, 0.913], shape: "rect" },
      { name: "709-A", coords: [0.833, 0.667, 0.931, 0.787], shape: "rect" },
      { name: "710-B", coords: [0.835, 0.54, 0.930, 0.658], shape: "rect" },
      { name: "710-A", coords: [0.835, 0.41, 0.931, 0.533], shape: "rect" },
      { name: "711-3", coords: [0.863, 0.23, 0.930, 0.315], shape: "rect" },
      { name: "711-1", coords: [0.833, 0.108, 0.930, 0.225], shape: "rect" },
      { name: "703", coords: [0.438, 0.273, 0.466, 0.402], shape: "rect" },
      { name: "704", coords: [0.467, 0.267, 0.5, 0.4], shape: "rect" },
      { name: "705", coords: [0.502, 0.268, 0.533, 0.402], shape: "rect" },
      { name: "706", coords: [0.534, 0.268, 0.566, 0.402], shape: "rect" },
      { name: "707", coords: [0.567, 0.276, 0.599, 0.4], shape: "rect" },
      { name: "708", coords: [0.601, 0.3, 0.662, 0.4], shape: "rect" }
    ]
    
  },
  바이오나노대학: {
  },

  '예술.체육대학2' : {
    "B1": [
      { name: "B103", coords: [0.424, 0.332, 0.450, 0.382], shape: "rect" },
      { name: "B104", coords: [0.425, 0.392, 0.450, 0.432], shape: "rect" },
      { name: "B105", coords: [0.427, 0.445, 0.450, 0.495], shape: "rect" },
      { name: "B106", coords: [0.467, 0.332, 0.495, 0.375], shape: "rect" },
      { name: "B107", coords: [0.469, 0.385, 0.493, 0.430], shape: "rect" },
      { name: "B108", coords: [0.467, 0.445, 0.493, 0.490], shape: "rect" },
      { name: "B109", coords: [0.497, 0.337, 0.524, 0.382], shape: "rect" },
      { name: "B110", coords: [0.495, 0.392, 0.522, 0.430], shape: "rect" },
      { name: "B111", coords: [0.498, 0.445, 0.522, 0.490], shape: "rect" },
      { name: "B112", coords: [0.542, 0.335, 0.566, 0.375], shape: "rect" },
      { name: "B113", coords: [0.542, 0.390, 0.566, 0.432], shape: "rect" },
      { name: "B114", coords: [0.542, 0.447, 0.566, 0.490], shape: "rect" },
      { name: "B115", coords: [0.570, 0.335, 0.593, 0.375], shape: "rect" },
      { name: "B116", coords: [0.569, 0.390, 0.597, 0.430], shape: "rect" },
      { name: "B117", coords: [0.569, 0.445, 0.594, 0.492], shape: "rect" },
      { name: "B118", coords: [0.612, 0.335, 0.637, 0.377], shape: "rect" },
      { name: "B119", coords: [0.614, 0.390, 0.637, 0.430], shape: "rect" },
      { name: "B120", coords: [0.614, 0.445, 0.637, 0.490], shape: "rect" },
      { name: "B121", coords: [0.642, 0.335, 0.660, 0.405], shape: "rect" },
      { name: "B122", coords: [0.642, 0.420, 0.662, 0.492], shape: "rect" },
      { name: "B123", coords: [0.679, 0.330, 0.701, 0.402], shape: "rect" },
      { name: "B124", coords: [0.679, 0.420, 0.698, 0.492], shape: "rect" },
      { name: "B125", coords: [0.749, 0.330, 0.774, 0.375], shape: "rect" },
      { name: "B126", coords: [0.749, 0.390, 0.776, 0.430], shape: "rect" },
      { name: "B127", coords: [0.749, 0.445, 0.776, 0.495], shape: "rect" },
      { name: "B128", coords: [0.794, 0.335, 0.818, 0.377], shape: "rect" },
      { name: "B129", coords: [0.794, 0.387, 0.819, 0.435], shape: "rect" },
      { name: "B130", coords: [0.793, 0.445, 0.819, 0.490], shape: "rect" }
    ],
    "1": [
      { name: "101", coords: [0.092, 0.445, 0.157, 0.572], shape: "rect" },
      { name: "102", coords: [0.162, 0.440, 0.224, 0.570], shape: "rect" },
      { name: "103", coords: [0.227, 0.440, 0.293, 0.575], shape: "rect" },
      { name: "104", coords: [0.296, 0.440, 0.366, 0.575], shape: "rect" },
      { name: "108", coords: [0.503, 0.308, 0.528, 0.362], shape: "rect" },
      { name: "109", coords: [0.503, 0.375, 0.525, 0.435], shape: "rect" },
      { name: "110", coords: [0.544, 0.303, 0.566, 0.360], shape: "rect" },
      { name: "111", coords: [0.544, 0.375, 0.567, 0.435], shape: "rect" },
      { name: "112", coords: [0.570, 0.303, 0.594, 0.365], shape: "rect" },
      { name: "113", coords: [0.569, 0.377, 0.594, 0.437], shape: "rect" },
      { name: "114", coords: [0.611, 0.303, 0.637, 0.360], shape: "rect" },
      { name: "115", coords: [0.611, 0.377, 0.635, 0.435], shape: "rect" },
      { name: "116", coords: [0.671, 0.128, 0.773, 0.262], shape: "rect" },
      { name: "117", coords: [0.773, 0.122, 0.807, 0.258], shape: "rect" },
      { name: "120", coords: [0.877, 0.123, 0.908, 0.258], shape: "rect" },
      { name: "121", coords: [0.910, 0.122, 0.942, 0.253], shape: "rect" },
      { name: "118", coords: [0.763, 0.303, 0.805, 0.435], shape: "rect" },
      { name: "118-A", coords: [0.807, 0.302, 0.841, 0.435], shape: "rect" },
      { name: "119-A", coords: [0.843, 0.298, 0.872, 0.435], shape: "rect" },
      { name: "119-B", coords: [0.875, 0.302, 0.910, 0.435], shape: "rect" },
      { name: "119-C", coords: [0.913, 0.298, 0.944, 0.435], shape: "rect" },
      { name: "105", coords: [0.091, 0.620, 0.157, 0.750], shape: "rect" },
      { name: "106", coords: [0.163, 0.620, 0.293, 0.750], shape: "rect" },
      { name: "107-1", coords: [0.400, 0.620, 0.431, 0.748], shape: "rect" },
      { name: "107-2", coords: [0.366, 0.620, 0.397, 0.750], shape: "rect" }
    ],
    "2": [
      { name: "201", coords: [0.089, 0.392, 0.121, 0.523], shape: "rect" },
      { name: "202", coords: [0.125, 0.397, 0.159, 0.527], shape: "rect" },
      { name: "203", coords: [0.159, 0.398, 0.191, 0.527], shape: "rect" },
      { name: "204", coords: [0.193, 0.393, 0.226, 0.528], shape: "rect" },
      { name: "205", coords: [0.230, 0.397, 0.260, 0.523], shape: "rect" },
      { name: "206", coords: [0.264, 0.392, 0.296, 0.527], shape: "rect" },
      { name: "207", coords: [0.301, 0.392, 0.329, 0.527], shape: "rect" },
      { name: "2082", coords: [0.335, 0.393, 0.366, 0.523], shape: "rect" },
      { name: "209", coords: [0.090, 0.573, 0.120, 0.710], shape: "rect" },
      { name: "210", coords: [0.125, 0.572, 0.154, 0.710], shape: "rect" },
      { name: "211", coords: [0.159, 0.572, 0.201, 0.710], shape: "rect" },
      { name: "212", coords: [0.207, 0.573, 0.251, 0.712], shape: "rect" },
      { name: "213", coords: [0.251, 0.577, 0.296, 0.710], shape: "rect" },
      { name: "214", coords: [0.368, 0.577, 0.400, 0.712], shape: "rect" },
      { name: "215", coords: [0.403, 0.572, 0.436, 0.712], shape: "rect" },
      { name: "217", coords: [0.579, 0.260, 0.612, 0.372], shape: "rect" },
      { name: "218", coords: [0.718, 0.075, 0.754, 0.255], shape: "rect" },
      { name: "219-1", coords: [0.754, 0.075, 0.821, 0.205], shape: "rect" },
      { name: "219-2", coords: [0.824, 0.070, 0.892, 0.205], shape: "rect" },
      { name: "220-1", coords: [0.894, 0.073, 0.928, 0.210], shape: "rect" },
      { name: "220-2", coords: [0.930, 0.070, 0.962, 0.203], shape: "rect" },
      { name: "221-1", coords: [0.778, 0.250, 0.820, 0.387], shape: "rect" },
      { name: "221-2", coords: [0.823, 0.255, 0.858, 0.387], shape: "rect" },
      { name: "221-3", coords: [0.861, 0.250, 0.892, 0.388], shape: "rect" },
      { name: "221-4", coords: [0.894, 0.255, 0.928, 0.392], shape: "rect" },
      { name: "221-5", coords: [0.928, 0.255, 0.965, 0.387], shape: "rect" },
      { name: "216", coords: [0.439, 0.215, 0.576, 0.388], shape: "rect" }
    ],
   "3": [
    { name: "301", coords: [0.090, 0.347, 0.120, 0.472], shape: "rect" },
    { name: "302", coords: [0.125, 0.353, 0.156, 0.473], shape: "rect" },
    { name: "303", coords: [0.160, 0.352, 0.190, 0.472], shape: "rect" },
    { name: "304", coords: [0.195, 0.352, 0.226, 0.473], shape: "rect" },
    { name: "306", coords: [0.264, 0.352, 0.295, 0.472], shape: "rect" },
    { name: "307", coords: [0.301, 0.352, 0.332, 0.472], shape: "rect" },
    { name: "308", coords: [0.335, 0.352, 0.365, 0.472], shape: "rect" },
    { name: "309", coords: [0.090, 0.522, 0.120, 0.643], shape: "rect" },
    { name: "310", coords: [0.125, 0.522, 0.156, 0.648], shape: "rect" },
    { name: "311", coords: [0.159, 0.522, 0.191, 0.647], shape: "rect" },
    { name: "312", coords: [0.195, 0.522, 0.224, 0.643], shape: "rect" },
    { name: "313", coords: [0.229, 0.518, 0.260, 0.648], shape: "rect" },
    { name: "314", coords: [0.265, 0.518, 0.296, 0.647], shape: "rect" },
    { name: "315", coords: [0.436, 0.220, 0.470, 0.347], shape: "rect" },
    { name: "316", coords: [0.475, 0.225, 0.541, 0.347], shape: "rect" },
    { name: "317", coords: [0.544, 0.223, 0.578, 0.348], shape: "rect" },
    { name: "318", coords: [0.580, 0.220, 0.646, 0.352], shape: "rect" },
    { name: "319", coords: [0.684, 0.045, 0.751, 0.218], shape: "rect" },
    { name: "320", coords: [0.754, 0.050, 0.822, 0.175], shape: "rect" },
    { name: "321-B", coords: [0.824, 0.050, 0.962, 0.173], shape: "rect" },
    { name: "322", coords: [0.777, 0.218, 0.857, 0.343], shape: "rect" },
    { name: "323", coords: [0.861, 0.215, 0.962, 0.352], shape: "rect" },
    { name: "305", coords: [0.229, 0.352, 0.260, 0.472], shape: "rect" }
  ],
    "4": [
      { name: "401", coords: [0.078, 0.378, 0.111, 0.498], shape: "rect" },
      { name: "402", coords: [0.115, 0.377, 0.145, 0.502], shape: "rect" },
      { name: "403", coords: [0.149, 0.377, 0.180, 0.502], shape: "rect" },
      { name: "404", coords: [0.185, 0.378, 0.216, 0.502], shape: "rect" },
      { name: "405", coords: [0.223, 0.378, 0.254, 0.502], shape: "rect" },
      { name: "406", coords: [0.259, 0.382, 0.288, 0.503], shape: "rect" },
      { name: "407", coords: [0.293, 0.382, 0.324, 0.498], shape: "rect" },
      { name: "408", coords: [0.327, 0.377, 0.361, 0.498], shape: "rect" },
      { name: "409", coords: [0.114, 0.547, 0.148, 0.670], shape: "rect" },
      { name: "410", coords: [0.079, 0.547, 0.109, 0.670], shape: "rect" },
      { name: "411", coords: [0.150, 0.547, 0.182, 0.672], shape: "rect" },
      { name: "412", coords: [0.187, 0.547, 0.218, 0.672], shape: "rect" },
      { name: "413", coords: [0.222, 0.547, 0.253, 0.670], shape: "rect" },
      { name: "414", coords: [0.257, 0.545, 0.290, 0.675], shape: "rect" },
      { name: "415", coords: [0.397, 0.507, 0.430, 0.712], shape: "rect" },
      { name: "416", coords: [0.436, 0.253, 0.467, 0.377], shape: "rect" },
      { name: "417", coords: [0.467, 0.253, 0.493, 0.377], shape: "rect" },
      { name: "418", coords: [0.506, 0.250, 0.536, 0.373], shape: "rect" },
      { name: "419", coords: [0.542, 0.253, 0.576, 0.373], shape: "rect" },
      { name: "420", coords: [0.578, 0.250, 0.608, 0.372], shape: "rect" },
      { name: "421", coords: [0.612, 0.253, 0.645, 0.377], shape: "rect" },
      { name: "422", coords: [0.681, 0.085, 0.715, 0.205], shape: "rect" },
      { name: "423", coords: [0.718, 0.085, 0.751, 0.205], shape: "rect" },
      { name: "424", coords: [0.754, 0.083, 0.787, 0.203], shape: "rect" },
      { name: "425", coords: [0.791, 0.083, 0.822, 0.205], shape: "rect" },
      { name: "426", coords: [0.824, 0.083, 0.858, 0.208], shape: "rect" },
      { name: "427", coords: [0.861, 0.083, 0.893, 0.203], shape: "rect" },
      { name: "428", coords: [0.897, 0.083, 0.928, 0.203], shape: "rect" },
      { name: "429", coords: [0.931, 0.085, 0.964, 0.208], shape: "rect" },
      { name: "430", coords: [0.790, 0.250, 0.857, 0.372], shape: "rect" },
      { name: "434", coords: [0.861, 0.245, 0.964, 0.373], shape: "rect" }
    ]
  },

  '예술.체육대학1': {
    "B1": [
      { name: "B01", coords: [0.427, 0.022, 0.595, 0.535], shape: "rect" },
      { name: "B02", coords: [0.333, 0.545, 0.598, 0.630], shape: "rect" },
      { name: "B03", coords: [0.333, 0.633, 0.595, 0.803], shape: "rect" },
      { name: "B04", coords: [0.428, 0.810, 0.429, 0.895, 0.516, 0.890, 0.516, 0.975, 0.682, 0.977, 0.684, 0.812], shape: "poly" },
      { name: "B05", coords: [0.257, 0.890, 0.420, 0.975], shape: "rect" },
      { name: "B06", coords: [0.163, 0.453, 0.419, 0.543], shape: "rect" },
      { name: "B07", coords: [0.165, 0.153, 0.419, 0.447], shape: "rect" },
      { name: "B08", coords: [0.164, 0.020, 0.330, 0.095], shape: "rect" }
    ],
    "1": [
      { name: "105", coords: [0.349, 0.170, 0.417, 0.283], shape: "rect" },
      { name: "102", coords: [0.419, 0.170, 0.525, 0.288], shape: "rect" },
      { name: "104", coords: [0.528, 0.170, 0.595, 0.285], shape: "rect" },
      { name: "103", coords: [0.600, 0.175, 0.813, 0.288], shape: "rect" },
      { name: "101", coords: [0.163, 0.288, 0.274, 0.443], shape: "rect" },
      { name: "107", coords: [0.165, 0.443, 0.274, 0.518], shape: "rect" },
      { name: "100", coords: [0.316, 0.392, 0.438, 0.563], shape: "rect" },
      { name: "106-A", coords: [0.349, 0.828, 0.705, 0.977], shape: "rect" },
      { name: "106-B", coords: [0.600, 0.755, 0.600, 0.825, 0.707, 0.825, 0.710, 0.985, 0.778, 0.980, 0.778, 0.757], shape: "poly" }
    ],
    "2": [
      { name: "201", coords: [0.588, 0.868, 0.820, 0.980], shape: "rect" },
      { name: "202-A", coords: [0.432, 0.868, 0.584, 0.983], shape: "rect" },
      { name: "202-B", coords: [0.356, 0.868, 0.431, 0.980], shape: "rect" },
      { name: "203-A", coords: [0.163, 0.285, 0.275, 0.360], shape: "rect" },
      { name: "203-B", coords: [0.164, 0.360, 0.275, 0.437], shape: "rect" },
      { name: "204-A", coords: [0.355, 0.168, 0.392, 0.278], shape: "rect" },
      { name: "204-B", coords: [0.395, 0.167, 0.548, 0.283], shape: "rect" },
      { name: "205-A", coords: [0.550, 0.168, 0.626, 0.283], shape: "rect" },
      { name: "205-B", coords: [0.627, 0.168, 0.705, 0.283], shape: "rect" },
      { name: "206", coords: [0.706, 0.167, 0.856, 0.278], shape: "rect" },
      { name: "208-A", coords: [0.202, 0.805, 0.275, 0.830], shape: "rect" },
      { name: "208-B", coords: [0.202, 0.750, 0.277, 0.805], shape: "rect" },
      { name: "203-C", coords: [0.163, 0.440, 0.277, 0.512], shape: "rect" },
      { name: "203-D", coords: [0.202, 0.515, 0.278, 0.595], shape: "rect" }
    ],
    "3": [
      { name: "307", coords: [0.690, 0.080, 0.877, 0.192], shape: "rect" },
      { name: "307-A", coords: [0.662, 0.078, 0.687, 0.190], shape: "rect" },
      { name: "306", coords: [0.497, 0.158, 0.607, 0.272], shape: "rect" },
      { name: "306-A", coords: [0.444, 0.155, 0.495, 0.275], shape: "rect" },
      { name: "305", coords: [0.391, 0.152, 0.442, 0.270], shape: "rect" },
      { name: "305-A", coords: [0.281, 0.152, 0.389, 0.272], shape: "rect" },
      { name: "304", coords: [0.253, 0.155, 0.279, 0.272], shape: "rect" },
      { name: "302", coords: [0.253, 0.862, 0.413, 0.982], shape: "rect" },
      { name: "301-A", coords: [0.417, 0.858, 0.467, 0.977], shape: "rect" },
      { name: "301", coords: [0.469, 0.862, 0.579, 0.978], shape: "rect" }
    ],
    "4": [
      { name: "406", coords: [0.689, 0.088, 0.915, 0.198], shape: "rect" },
      { name: "406-A", coords: [0.660, 0.087, 0.686, 0.197], shape: "rect" },
      { name: "405", coords: [0.460, 0.162, 0.630, 0.277], shape: "rect" },
      { name: "404", coords: [0.289, 0.163, 0.457, 0.273], shape: "rect" },
      { name: "404-A", coords: [0.258, 0.162, 0.286, 0.277], shape: "rect" },
      { name: "402", coords: [0.261, 0.855, 0.429, 0.970], shape: "rect" },
      { name: "401", coords: [0.432, 0.855, 0.598, 0.968], shape: "rect" }
    ],
    "5": [
      { name: "509", coords: [0.844, 0.088, 0.898, 0.197], shape: "rect" },
      { name: "508", coords: [0.675, 0.087, 0.841, 0.198], shape: "rect" },
      { name: "507", coords: [0.649, 0.087, 0.672, 0.202], shape: "rect" },
      { name: "506-C", coords: [0.477, 0.163, 0.616, 0.273], shape: "rect" },
      { name: "506-B", coords: [0.421, 0.203, 0.477, 0.273], shape: "rect" },
      { name: "506-A", coords: [0.280, 0.163, 0.419, 0.273], shape: "rect" },
      { name: "506", coords: [0.249, 0.163, 0.278, 0.273], shape: "rect" },
      { name: "502", coords: [0.252, 0.845, 0.418, 0.955], shape: "rect" },
      { name: "501", coords: [0.422, 0.840, 0.587, 0.955], shape: "rect" }
    ],
    "6": [
      { name: "601-A", coords: [0.296, 0.157, 0.347, 0.267], shape: "rect" },
      { name: "601-1", coords: [0.266, 0.158, 0.292, 0.268], shape: "rect" },
      { name: "601-B", coords: [0.349, 0.158, 0.456, 0.267], shape: "rect" },
      { name: "602", coords: [0.462, 0.157, 0.567, 0.268], shape: "rect" },
      { name: "602-A", coords: [0.570, 0.158, 0.622, 0.268], shape: "rect" },
      { name: "603", coords: [0.651, 0.078, 0.788, 0.193], shape: "rect" },
      { name: "604", coords: [0.789, 0.078, 0.897, 0.188], shape: "rect" }
    ],
    "7": [
      { name: "701", coords: [0.628, 0.107, 0.652, 0.198], shape: "rect" },
      { name: "702-1", coords: [0.655, 0.088, 0.680, 0.198], shape: "rect" },
      { name: "702", coords: [0.683, 0.083, 0.789, 0.198], shape: "rect" },
      { name: "703", coords: [0.793, 0.087, 0.896, 0.198], shape: "rect" }
    ]
  },

  교육대학원: {
   "1": [
      { name: "101", coords: [0.103, 0.555, 0.168, 0.615], shape: "rect" },
      { name: "102", coords: [0.171, 0.490, 0.271, 0.612], shape: "rect" },
      { name: "103", coords: [0.275, 0.492, 0.378, 0.615], shape: "rect" },
      { name: "104", coords: [0.172, 0.660, 0.236, 0.773], shape: "rect" },
      { name: "105-A", coords: [0.238, 0.655, 0.271, 0.713], shape: "rect" },
      { name: "105-B", coords: [0.272, 0.655, 0.305, 0.780], shape: "rect" },
      { name: "106-A", coords: [0.307, 0.652, 0.341, 0.775], shape: "rect" },
      { name: "106-B", coords: [0.344, 0.655, 0.382, 0.775], shape: "rect" },
      { name: "107-A", coords: [0.381, 0.655, 0.411, 0.738], shape: "rect" },
      { name: "107-B", coords: [0.415, 0.655, 0.446, 0.740], shape: "rect" },
      { name: "100", coords: [0.518, 0.660, 0.585, 0.740], shape: "rect" },
      { name: "108", coords: [0.654, 0.535, 0.725, 0.427, 0.788, 0.520, 0.716, 0.620], shape: "poly" },
      { name: "109", coords: [0.728, 0.425, 0.799, 0.318, 0.862, 0.410, 0.789, 0.512], shape: "poly" },
      { name: "110-A", coords: [0.800, 0.314, 0.825, 0.283, 0.886, 0.370, 0.861, 0.405], shape: "poly" },
      { name: "110-B", coords: [0.825, 0.283, 0.847, 0.248, 0.908, 0.337, 0.887, 0.370], shape: "poly" },
      { name: "111-A", coords: [0.744, 0.167, 0.769, 0.133, 0.830, 0.223, 0.806, 0.257], shape: "poly" },
      { name: "111-B", coords: [0.721, 0.202, 0.744, 0.168, 0.805, 0.258, 0.782, 0.288], shape: "poly" },
      { name: "112", coords: [0.647, 0.308, 0.719, 0.203, 0.778, 0.297, 0.707, 0.395], shape: "poly" },
      { name: "113", coords: [0.573, 0.417, 0.644, 0.308, 0.705, 0.397, 0.633, 0.507], shape: "poly" }
    ],
    "2": [
      { name: "204", coords: [0.084, 0.552, 0.151, 0.695], shape: "rect" },
      { name: "203", coords: [0.154, 0.555, 0.186, 0.695], shape: "rect" },
      { name: "202", coords: [0.222, 0.552, 0.289, 0.695], shape: "rect" },
      { name: "201", coords: [0.294, 0.552, 0.362, 0.700], shape: "rect" },
      { name: "220-A", coords: [0.559, 0.470, 0.582, 0.427, 0.643, 0.530, 0.619, 0.567], shape: "poly" },
      { name: "220-B", coords: [0.585, 0.425, 0.607, 0.387, 0.670, 0.492, 0.647, 0.527], shape: "poly" },
      { name: "219", coords: [0.609, 0.385, 0.657, 0.312, 0.716, 0.410, 0.668, 0.485], shape: "poly" },
      { name: "218", coords: [0.657, 0.308, 0.706, 0.227, 0.766, 0.330, 0.719, 0.410], shape: "poly" },
      { name: "217", coords: [0.707, 0.223, 0.766, 0.148, 0.820, 0.247, 0.769, 0.322], shape: "poly" },
      { name: "216", coords: [0.789, 0.357, 0.836, 0.282, 0.901, 0.385, 0.852, 0.460], shape: "poly" },
      { name: "215", coords: [0.738, 0.445, 0.789, 0.360, 0.848, 0.460, 0.802, 0.540], shape: "poly" },
      { name: "214", coords: [0.691, 0.517, 0.736, 0.440, 0.799, 0.545, 0.751, 0.615], shape: "poly" },
      { name: "213", coords: [0.641, 0.600, 0.689, 0.520, 0.752, 0.625, 0.702, 0.693], shape: "poly" },
      { name: "212", coords: [0.589, 0.683, 0.638, 0.605, 0.700, 0.705, 0.651, 0.778], shape: "poly" },
      { name: "211", coords: [0.612, 0.730, 0.651, 0.795, 0.652, 0.883, 0.612, 0.885], shape: "poly" },
      { name: "211-A", coords: [0.577, 0.813, 0.609, 0.885], shape: "rect" },
      { name: "210-B", coords: [0.540, 0.745, 0.574, 0.885], shape: "rect" },
      { name: "210-A", coords: [0.506, 0.745, 0.539, 0.885], shape: "rect" },
      { name: "209", coords: [0.434, 0.740, 0.503, 0.880], shape: "rect" },
      { name: "208", coords: [0.364, 0.740, 0.434, 0.888], shape: "rect" },
      { name: "207", coords: [0.294, 0.743, 0.361, 0.890], shape: "rect" },
      { name: "206", coords: [0.224, 0.740, 0.289, 0.885], shape: "rect" },
      { name: "205-B", coords: [0.188, 0.745, 0.222, 0.883], shape: "rect" },
      { name: "205-A", coords: [0.151, 0.743, 0.186, 0.883], shape: "rect" }
    ],
    "3": [
      { name: "331", coords: [0.098, 0.565, 0.129, 0.648], shape: "rect" },
      { name: "332", coords: [0.134, 0.568, 0.164, 0.653], shape: "rect" },
      { name: "333", coords: [0.170, 0.563, 0.199, 0.648], shape: "rect" },
      { name: "334", coords: [0.202, 0.568, 0.235, 0.653], shape: "rect" },
      { name: "335", coords: [0.237, 0.565, 0.268, 0.653], shape: "rect" },
      { name: "336", coords: [0.271, 0.568, 0.302, 0.653], shape: "rect" },
      { name: "337", coords: [0.305, 0.563, 0.337, 0.650], shape: "rect" },
      { name: "338", coords: [0.341, 0.568, 0.372, 0.653], shape: "rect" },
      { name: "339", coords: [0.204, 0.683, 0.235, 0.758], shape: "rect" },
      { name: "340", coords: [0.237, 0.687, 0.268, 0.757], shape: "rect" },
      { name: "341", coords: [0.270, 0.683, 0.302, 0.762], shape: "rect" },
      { name: "342", coords: [0.305, 0.683, 0.337, 0.763], shape: "rect" },
      { name: "343", coords: [0.375, 0.702, 0.431, 0.743], shape: "rect" },
      { name: "344", coords: [0.431, 0.702, 0.487, 0.743], shape: "rect" },
      { name: "345", coords: [0.490, 0.698, 0.545, 0.748], shape: "rect" },
      { name: "346", coords: [0.165, 0.788, 0.198, 0.877], shape: "rect" },
      { name: "347", coords: [0.201, 0.788, 0.236, 0.883], shape: "rect" },
      { name: "348", coords: [0.237, 0.793, 0.267, 0.878], shape: "rect" },
      { name: "349", coords: [0.271, 0.792, 0.305, 0.877], shape: "rect" },
      { name: "350", coords: [0.307, 0.793, 0.337, 0.878], shape: "rect" },
      { name: "351", coords: [0.340, 0.788, 0.372, 0.877], shape: "rect" },
      { name: "352", coords: [0.375, 0.788, 0.406, 0.877], shape: "rect" },
      { name: "353", coords: [0.409, 0.792, 0.442, 0.878], shape: "rect" },
      { name: "354", coords: [0.445, 0.793, 0.476, 0.883], shape: "rect" },
      { name: "355", coords: [0.479, 0.793, 0.513, 0.877], shape: "rect" },
      { name: "356", coords: [0.513, 0.793, 0.545, 0.877], shape: "rect" },
      { name: "357", coords: [0.547, 0.788, 0.579, 0.877], shape: "rect" },
      { name: "358", coords: [0.583, 0.793, 0.615, 0.882], shape: "rect" },
      { name: "359", coords: [0.618, 0.792, 0.656, 0.878], shape: "rect" },
      { name: "319", coords: [0.567, 0.487, 0.663, 0.335, 0.723, 0.430, 0.626, 0.575], shape: "poly" },
      { name: "318", coords: [0.664, 0.332, 0.710, 0.262, 0.771, 0.355, 0.727, 0.427], shape: "poly" },
      { name: "317", coords: [0.713, 0.253, 0.759, 0.178, 0.823, 0.278, 0.776, 0.352], shape: "poly" },
      { name: "316", coords: [0.819, 0.340, 0.838, 0.308, 0.900, 0.402, 0.877, 0.435], shape: "poly" },
      { name: "315", coords: [0.746, 0.455, 0.816, 0.345, 0.875, 0.440, 0.805, 0.550], shape: "poly" },
      { name: "314", coords: [0.696, 0.535, 0.743, 0.460, 0.801, 0.555, 0.756, 0.630], shape: "poly" },
      { name: "313", coords: [0.673, 0.572, 0.694, 0.535, 0.754, 0.630, 0.733, 0.665], shape: "poly" },
      { name: "312", coords: [0.598, 0.683, 0.668, 0.570, 0.729, 0.665, 0.657, 0.780], shape: "poly" }
    ],
    "4": [
      { name: "431", coords: [0.103, 0.547, 0.132, 0.632], shape: "rect" },
      { name: "432", coords: [0.135, 0.547, 0.170, 0.632], shape: "rect" },
      { name: "433", coords: [0.173, 0.550, 0.204, 0.635], shape: "rect" },
      { name: "435", coords: [0.240, 0.547, 0.271, 0.635], shape: "rect" },
      { name: "436", coords: [0.276, 0.550, 0.308, 0.635], shape: "rect" },
      { name: "437", coords: [0.310, 0.550, 0.341, 0.632], shape: "rect" },
      { name: "438", coords: [0.343, 0.550, 0.377, 0.637], shape: "rect" },
      { name: "439", coords: [0.205, 0.668, 0.237, 0.738], shape: "rect" },
      { name: "440", coords: [0.241, 0.668, 0.274, 0.740], shape: "rect" },
      { name: "441", coords: [0.276, 0.665, 0.307, 0.738], shape: "rect" },
      { name: "442", coords: [0.308, 0.668, 0.341, 0.743], shape: "rect" },
      { name: "443", coords: [0.378, 0.680, 0.434, 0.730], shape: "rect" },
      { name: "444", coords: [0.438, 0.680, 0.492, 0.730], shape: "rect" },
      { name: "445", coords: [0.495, 0.678, 0.549, 0.728], shape: "rect" },
      { name: "446", coords: [0.171, 0.773, 0.201, 0.855], shape: "rect" },
      { name: "447", coords: [0.207, 0.775, 0.237, 0.855], shape: "rect" },
      { name: "448", coords: [0.240, 0.770, 0.274, 0.855], shape: "rect" },
      { name: "449", coords: [0.274, 0.770, 0.308, 0.855], shape: "rect" },
      { name: "450", coords: [0.310, 0.773, 0.341, 0.858], shape: "rect" },
      { name: "451", coords: [0.344, 0.770, 0.380, 0.853], shape: "rect" },
      { name: "452", coords: [0.380, 0.770, 0.410, 0.855], shape: "rect" },
      { name: "453", coords: [0.413, 0.770, 0.445, 0.855], shape: "rect" },
      { name: "454", coords: [0.448, 0.770, 0.480, 0.855], shape: "rect" },
      { name: "455", coords: [0.484, 0.770, 0.514, 0.853], shape: "rect" },
      { name: "456", coords: [0.517, 0.770, 0.550, 0.855], shape: "rect" },
      { name: "457", coords: [0.552, 0.768, 0.586, 0.855], shape: "rect" },
      { name: "458", coords: [0.587, 0.770, 0.622, 0.855], shape: "rect" },
      { name: "459", coords: [0.625, 0.773, 0.659, 0.853], shape: "rect" },
      { name: "434", coords: [0.205, 0.550, 0.236, 0.637], shape: "rect" },
      { name: "420", coords: [0.572, 0.470, 0.645, 0.357, 0.704, 0.452, 0.631, 0.560], shape: "poly" },
      { name: "419", coords: [0.648, 0.355, 0.667, 0.318, 0.730, 0.417, 0.707, 0.450], shape: "poly" },
      { name: "418", coords: [0.668, 0.313, 0.715, 0.242, 0.777, 0.340, 0.732, 0.410], shape: "poly" },
      { name: "417", coords: [0.718, 0.243, 0.765, 0.167, 0.827, 0.263, 0.782, 0.335], shape: "poly" },
      { name: "416", coords: [0.796, 0.365, 0.846, 0.292, 0.906, 0.390, 0.860, 0.460], shape: "poly" },
      { name: "415", coords: [0.749, 0.440, 0.795, 0.365, 0.855, 0.460, 0.800, 0.535], shape: "poly" },
      { name: "414", coords: [0.699, 0.515, 0.746, 0.442, 0.800, 0.540, 0.763, 0.615], shape: "poly" },
      { name: "413", coords: [0.650, 0.595, 0.698, 0.517, 0.760, 0.612, 0.713, 685], shape: "poly" },
      { name: "412", coords: [0.603, 0.665, 0.648, 0.595, 0.710, 0.690, 0.663, 0.758], shape: "poly" }
    ],
    "5": [
      { name: "504", coords: [0.104, 0.557, 0.170, 0.690], shape: "rect" },
      { name: "503", coords: [0.174, 0.555, 0.237, 0.690], shape: "rect" },
      { name: "502", coords: [0.240, 0.555, 0.308, 0.688], shape: "rect" },
      { name: "501", coords: [0.309, 0.550, 0.377, 0.688], shape: "rect" },
      { name: "505", coords: [0.171, 0.735, 0.237, 0.870], shape: "rect" },
      { name: "506", coords: [0.241, 0.735, 0.307, 0.870], shape: "rect" },
      { name: "507", coords: [0.310, 0.738, 0.377, 0.870], shape: "rect" },
      { name: "508", coords: [0.380, 0.735, 0.447, 0.873], shape: "rect" },
      { name: "509", coords: [0.448, 0.735, 0.516, 0.870], shape: "rect" },
      { name: "510", coords: [0.517, 0.735, 0.586, 0.870], shape: "rect" },
      { name: "511", coords: [0.589, 0.735, 0.629, 0.735, 0.659, 0.785, 0.659, 0.870, 0.589, 0.868], shape: "poly" },
      { name: "521", coords: [0.521, 0.545, 0.566, 0.475, 0.626, 0.570, 0.581, 0.640], shape: "poly" },
      { name: "520", coords: [0.570, 0.470, 0.642, 0.357, 0.701, 0.452, 0.631, 0.570], shape: "poly" },
      { name: "519", coords: [0.645, 0.355, 0.664, 0.317, 0.727, 0.415, 0.704, 0.450], shape: "poly" },
      { name: "518", coords: [0.667, 0.312, 0.738, 0.203, 0.800, 0.298, 0.729, 0.412], shape: "poly" },
      { name: "517", coords: [0.741, 0.198, 0.765, 0.163, 0.827, 0.258, 0.802, 0.298], shape: "poly" },
      { name: "516", coords: [0.749, 0.440, 0.841, 0.288, 0.902, 0.390, 0.810, 0.545], shape: "poly" },
      { name: "514", coords: [0.699, 0.525, 0.746, 0.445, 0.807, 0.545, 0.760, 0.612], shape: "poly" },
      { name: "513", coords: [0.651, 0.597, 0.702, 0.520, 0.757, 0.622, 0.712, 0.693], shape: "poly" },
      { name: "512", coords: [0.601, 0.673, 0.648, 0.600, 0.707, 0.695, 0.663, 0.770], shape: "poly" }
    ],
    "6": [
      { name: "601", coords: [0.108, 0.540, 0.142, 0.622], shape: "rect" },
      { name: "602", coords: [0.142, 0.537, 0.176, 0.625], shape: "rect" },
      { name: "603", coords: [0.178, 0.542, 0.209, 0.627], shape: "rect" },
      { name: "604", coords: [0.211, 0.542, 0.245, 0.627], shape: "rect" },
      { name: "605", coords: [0.246, 0.540, 0.280, 0.625], shape: "rect" },
      { name: "606", coords: [0.282, 0.542, 0.313, 0.622], shape: "rect" },
      { name: "607", coords: [0.316, 0.540, 0.349, 0.620], shape: "rect" },
      { name: "608", coords: [0.352, 0.540, 0.383, 0.622], shape: "rect" },
      { name: "609", coords: [0.212, 0.652, 0.268, 0.725], shape: "rect" },
      { name: "610", coords: [0.271, 0.652, 0.327, 0.728], shape: "rect" },
      { name: "611-A", coords: [0.329, 0.655, 0.355, 0.725], shape: "rect" },
      { name: "611-B", coords: [0.357, 0.652, 0.383, 0.725], shape: "rect" },
      { name: "613", coords: [0.177, 0.758, 0.208, 0.843], shape: "rect" },
      { name: "614", coords: [0.212, 0.760, 0.280, 0.840], shape: "rect" },
      { name: "615", coords: [0.280, 0.760, 0.313, 0.840], shape: "rect" },
      { name: "616", coords: [0.316, 0.755, 0.347, 0.840], shape: "rect" },
      { name: "617", coords: [0.350, 0.755, 0.383, 0.845], shape: "rect" },
      { name: "618", coords: [0.386, 0.760, 0.420, 0.840], shape: "rect" },
      { name: "619", coords: [0.420, 0.760, 0.455, 0.838], shape: "rect" },
      { name: "620", coords: [0.456, 0.758, 0.487, 0.840], shape: "rect" },
      { name: "621", coords: [0.490, 0.758, 0.521, 0.840], shape: "rect" },
      { name: "622", coords: [0.525, 0.758, 0.560, 0.840], shape: "rect" },
      { name: "623", coords: [0.594, 0.755, 0.628, 0.840], shape: "rect" },
      { name: "624", coords: [0.559, 0.753, 0.589, 0.840], shape: "rect" },
      { name: "625", coords: [0.632, 0.760, 0.665, 0.840], shape: "rect" }
    ]
  },
};



function FloorPage() {
  const { building: initialBuilding = "비전타워", floor: initialFloor = "1" } = useParams();
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalPosition, setModalPosition] = useState({ x: 0, y: 0 });
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [currentLecture, setCurrentLecture] = useState({});
  const [buildingList, setBuildingList] = useState([]);
  const [floorList, setFloorList] = useState([]);
  const [currentBuilding, setCurrentBuilding] = useState(initialBuilding);
  const [currentFloor, setCurrentFloor] = useState(initialFloor);

  function handleBuildingClick(clickedBuilding) {
    setCurrentBuilding(clickedBuilding);
    navigate(`/building/${clickedBuilding}/1`); // 기본적으로 1층으로 이동
  }

  function handleFloorClick(clickedFloor) {
    setCurrentFloor(clickedFloor);
    navigate(`/building/${currentBuilding}/${clickedFloor}`);
  }

  const floorImage = floorPlans[currentBuilding]?.[currentFloor] || floorPlans["비전타워"]["1"]; // 기본값은 비전타워 1층
  const currentFloorClassrooms = useMemo(() => {
    return classroomCoordinates[currentBuilding]?.[currentFloor] || [];
  }, [currentBuilding, currentFloor]);

  const getCurrentPeriod = () => {
    const now = new Date();
    const hour = now.getHours();
    const dayNames = ["일", "월", "화", "수", "목", "금", "토"];
    const day = dayNames[now.getDay()];
  
    // 교시 시간대 (예: 9시~10시 -> 1교시)
    const periods = [
      { start: 9, end: 10, period: "1" },
      { start: 10, end: 11, period: "2" },
      { start: 11, end: 12, period: "3" },
      { start: 12, end: 13, period: "4" },
      { start: 13, end: 14, period: "5" },
      { start: 14, end: 15, period: "6" },
      { start: 15, end: 16, period: "7" },
      { start: 16, end: 17, period: "8" },
      { start: 17, end: 18, period: "9" },
      { start: 18, end: 19, period: "10" },
      { start: 19, end: 20, period: "11" },
      { start: 20, end: 21, period: "12" },
      { start: 21, end: 22, period: "13" },
      { start: 22, end: 23, period: "14" },
    ];
  
    const currentPeriod = periods.find(p => hour >= p.start && hour < p.end);
    if (currentPeriod) {
      return `${day}${currentPeriod.period}`; // 예: "수3"
    }
    return ""; // 현재 시간이 교시 범위가 아닐 경우
  };
  
  const openModal = useCallback(async (classroomName, event) => {
    console.log("openModal 호출됨", classroomName, event);
    const x = (event.clientX / window.innerWidth) * 100;
    const y = (event.clientY / window.innerHeight) * 100;
    
    const offsetX = 15 / 2; // 모달 너비의 절반 (vw 기준)
    const offsetY = 15 / 2; // 임의의 높이 절반 값 (vh 기준, 실제 높이에 따라 조정 필요)
    
    const calculatedX = Math.min(Math.max(x - offsetX, 5), 95 - 15 + offsetX); // 좌우 경계
    const calculatedY = Math.min(Math.max(y - offsetY, 5), 95 - 15 + offsetY); // 상하 경계
    
    setModalPosition({ x: calculatedX, y: calculatedY });
    setSelectedRoom(classroomName);
    setCurrentLecture({});
    setIsModalOpen(true);
    
    const currentSlot = getCurrentPeriod();
    console.log("getCurrentPeriod 결과:", currentSlot);
  
    if (!currentSlot) {
      setCurrentLecture({
        title: "현재 교시가 아니거나 수업이 없습니다.",
        professor: "",
        schedule: "",
      });
      return;
    }
  
    console.log("currentBuilding 값:", currentBuilding);
  
    try {
      console.log("try 블록 시작");
      const response = await axios.get(
        "http://110.15.135.250:8000/building-service/member/classes",
        {
          headers: {
            Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
            "Content-Type": "application/json",
          },
        }
      );
  
      console.log("API 응답 상태:", response.status);
      console.log("API 응답 데이터:", response.data);
  
      if (response.status === 200 && response.data && Array.isArray(response.data.data) && response.data.data.length > 0) {
        const classes = response.data.data; // 전체 강의 목록
        const currentClass = classes.find(classInfo => 
          classInfo.buildingName === currentBuilding &&
          classInfo.roomName === classroomName &&
          classInfo.courseTime.split(",").map(time => time.trim()).includes(currentSlot)
        );
  
        if (currentClass) {
          setCurrentLecture(currentClass);
          console.log("setCurrentLecture(currentClass) 실행됨", currentClass);
        } else {
          setCurrentLecture({
            title: "현재 진행 중인 강의가 없습니다.",
            professor: "",
            schedule: "",
          });
          console.log("setCurrentLecture (수업 없음) 실행됨");
        }
      } else {
        console.error("강의 정보 조회 실패:", response.status);
        setCurrentLecture({
          title: "강의 정보를 불러오는 데 실패했습니다.",
          professor: "",
          schedule: "",
        });
      }
    } catch (err) {
      console.log("catch 블록 실행:", err);
      console.error("강의 조회 실패", err);
      setCurrentLecture({
        title: "강의 정보를 불러오는 데 실패했습니다.",
        professor: "",
        schedule: "",
      });
    }
  
  }, [currentBuilding]);
  


  const closeModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedRoom(null);
    setCurrentLecture({});
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isModalOpen && !event.target.closest('.lecture-modal')) {
        closeModal();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isModalOpen, closeModal]);

  // 이미지 리사이즈 및 좌표 업데이트
  useEffect(() => {
    const updateCoords = () => {
      const img = document.querySelector(`img[usemap="#floorMap-${currentBuilding}-${currentFloor}"]`);
      if (!img) return;
      const width = img.clientWidth;
      const height = img.clientHeight;

      const areas = document.querySelectorAll(`map[name="floorMap-${currentBuilding}-${currentFloor}"] area`);
      areas.forEach(area => {
        try {
          const rawData = area.dataset.coords;
          if (!rawData) return;

          const ratioCoords = JSON.parse(rawData);
          if (!Array.isArray(ratioCoords)) return;

          const pixelCoords = ratioCoords.map((val, i) =>
            i % 2 === 0 ? Math.round(val * width) : Math.round(val * height)
          );
          area.coords = pixelCoords.join(',');
        } catch (err) {
          console.warn('좌표 변환 실패:', err);
        }
      });
    };

    updateCoords();
    window.addEventListener("resize", updateCoords);
    return () => window.removeEventListener("resize", updateCoords);
  }, [currentBuilding, currentFloor, currentFloorClassrooms]);

  useEffect(() => {
    axios.get("http://110.15.135.250:8000/building-service/member/building", {
      headers: {
        'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
              "Content-Type": "application/json",
      },
    })
    .then((res) => {
      console.log("건물 목록 API 응답:", res.data);
      setBuildingList(res.data.data || []); // API에서 받아온 건물 리스트 설정
      console.log("buildingList 상태:", buildingList);
    })
    .catch((error) => {
      console.error("건물 목록을 불러오는 데 실패했습니다:", error);
    });
  }, []);

  useEffect(() => {
    if (currentBuilding) {
      axios.get(`http://110.15.135.250:8000/building-service/member/building/${currentBuilding}`, {
        headers: {
          'Authorization': "Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VySWQiOjIsInJvbGUiOiJBRE1JTiIsInN1YiI6IkF1dGhvcml6YXRpb24iLCJpYXQiOjE3NDU0MTE3NzMsImV4cCI6MTc1NDA1MTc3M30.VBuP9Li37A7YGPTlv3Jc2dn8E1h6WK2CBOUTxi92cZU",
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(`${currentBuilding} 층 목록 API 응답:`, res.data);
        setFloorList(res.data?.data?.floors || []);
        console.log("floorList 상태:", floorList);
      })
      .catch((error) => {
        console.error(`${currentBuilding}의 층 정보를 불러오는 데 실패했습니다:`, error);
        setFloorList([]);
      });
    }
  }, [currentBuilding]);

  return (
    <div>
      <NavBar />
      <div className={styles.bg} />
      <div className={styles.content}>
        <div className={styles.titleBox}>
          <h2 className={styles.title}>{currentBuilding} {currentFloor}층</h2>
        </div>

        <div className={styles.mainContainer}>
          <img
            src={floorImage}
            alt={`${currentBuilding} ${currentFloor}층`}
            className={styles.floorImage}
            useMap={`#floorMap-${currentBuilding}-${currentFloor}`}
          />
          <map name={`floorMap-${currentBuilding}-${currentFloor}`}>
            {(currentFloorClassrooms || []).map((classroom, index) => (
              <area
                key={index}
                shape={classroom.shape}
                data-coords={JSON.stringify(classroom.coords)}
                alt={classroom.name}
                title={classroom.name}
                onClick={(event) => openModal(classroom.name, event)}
                style={{ cursor: 'pointer', outline: 'none' }}
              />
            ))}
          </map>

          <div className={styles.floorList}
          style={{ marginTop: floorList.length > 11 ? '-11vh' : '-9vh' }}>
            <ul>
              {(floorList || []).map((fl) => (
                <li
                  key={fl}
                  onClick={() => handleFloorClick(fl)}
                  className={fl === currentFloor ? `${styles.floorItem} ${styles.active}` : styles.floorItem}
                >
                  {fl}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.buildingList}>
            <ul>
              {(buildingList || []).map((bld) => (
                <li
                  key={bld}
                  onClick={() => handleBuildingClick(bld)}
                  className={bld === currentBuilding ? `${styles.buildingItem} ${styles.active}` : styles.buildingItem}
                >
                  {bld}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {isModalOpen && selectedRoom && currentLecture && (
        <LectureModal
          building={currentBuilding}
          room={selectedRoom}
          lectureData={currentLecture}
          position={modalPosition}
          styles={modalStyles}
        />
      )}
    </div>
  );
}

export default FloorPage;
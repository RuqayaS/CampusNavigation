import type { Room } from "./rooms";

export enum GoogleColor {
  Blue = "bg-google-blue",
  Red = "bg-google-red",
  Yellow = "bg-google-yellow",
  Green = "bg-google-green",
}

export enum Day {
  Sunday,
  Monday,
  Tuesday,
  Wednesday,
  Thursday,
}

export const corners = [
  {
    name: "E Corner",
    href: "/corners/E",
    color: GoogleColor.Blue,
  },
  {
    name: "F Corner",
    href: "/corners/F",
    color: GoogleColor.Red,
  },
  {
    name: "G Corner",
    href: "/corners/G",
    color: GoogleColor.Yellow,
  },
  {
    name: "H Corner",
    href: "/corners/H",
    color: GoogleColor.Green,
  },
];

export const roomTypeMap: {
  [key: string]: {
    headerColor: GoogleColor;
    freeColor: GoogleColor;
    link: string;
  };
} = {
  E: {
    headerColor: GoogleColor.Blue,
    freeColor: GoogleColor.Blue,
    link: "/corners/E",
  },
  F: {
    headerColor: GoogleColor.Red,
    freeColor: GoogleColor.Red,
    link: "/corners/F",
  },
  G: {
    headerColor: GoogleColor.Yellow,
    freeColor: GoogleColor.Yellow,
    link: "/corners/G",
  },
  H: {
    headerColor: GoogleColor.Green,
    freeColor: GoogleColor.Green,
    link: "/corners/H",
  },
};

export const getDays = (room: Room) => {
  return [
    { day: "Sunday", key: Day.Sunday, timeSlots: room.sunday },
    { day: "Monday", key: Day.Monday, timeSlots: room.monday },
    { day: "Tuesday", key: Day.Tuesday, timeSlots: room.tuesday },
    { day: "Wednesday", key: Day.Wednesday, timeSlots: room.wednesday },
    { day: "Thursday", key: Day.Thursday, timeSlots: room.thursday },
  ];
};

export const room_locations = [
  // ===============================
  // INSTRUCTOR OFFICES
  // ===============================
  {
    id: 1,
    type: "instructor",
    instructorName: "Dr. Ahmed Al-Mansoori",
    building: "Tuwaiq Building",
    floor: "2nd Floor",
    roomNumber: "T211",
    nearestLandmark: "Main Elevator",
    directions:
      "Head straight from Key Cafe, take Elevator E to the 2nd floor, room is on your left.",
    officeHours: "Sun–Wed: 10:00–12:00",
  },
  {
    id: 2,
    type: "instructor",
    instructorName: "Dr. Fatima Al-Zahrani",
    building: "Main Building",
    floor: "3rd Floor",
    roomNumber: "M305",
    nearestLandmark: "Library Entrance",
    directions:
      "From Library Entrance, follow corridor B, take stairs to the 3rd floor, room 305 is on the right.",
    officeHours: "Mon–Thu: 09:00–11:00",
  },
  {
    id: 3,
    type: "instructor",
    instructorName: "Prof. Mohammed Al-Qahtani",
    building: "Najd Building",
    floor: "1st Floor",
    roomNumber: "N102",
    nearestLandmark: "IT Department",
    directions:
      "Enter Najd, take the first right toward IT Department, room N102 is next to the help desk.",
    officeHours: "Sun–Tue: 13:00–15:00",
  },
  {
    id: 4,
    type: "instructor",
    instructorName: "Dr. Sarah Al-Mutairi",
    building: "Library & Gym",
    floor: "Ground Floor",
    roomNumber: "LG08",
    nearestLandmark: "Gym Reception",
    directions:
      "Enter through Gym Reception, follow the hallway straight, room LG08 is on the left.",
    officeHours: "Mon–Wed: 11:00–13:00",
  },

  // ===============================
  // CLASSROOMS
  // ===============================
  {
    id: 5,
    type: "classroom",
    building: "Main Building",
    floor: "1st Floor",
    roomNumber: "M101",
    nearestLandmark: "Main Hall",
    directions:
      "From Main Hall, walk straight past reception, room is the third door on the right.",
  },
  {
    id: 6,
    type: "classroom",
    building: "Main Building",
    floor: "2nd Floor",
    roomNumber: "M204",
    nearestLandmark: "Stairs B",
    directions:
      "Take Stairs B to the 2nd floor, turn left, room M204 is next to the study lounge.",
  },
  {
    id: 7,
    type: "classroom",
    building: "Main Building",
    floor: "3rd Floor",
    roomNumber: "M318",
    nearestLandmark: "Elevator A",
    directions:
      "Take Elevator A to the 3rd floor, turn right, room is straight ahead.",
  },
  {
    id: 8,
    type: "classroom",
    building: "Najd Building",
    floor: "Ground Floor",
    roomNumber: "N015",
    nearestLandmark: "Café Corner",
    directions:
      "From Café Corner, head left and walk straight until you reach room N015.",
  },
  {
    id: 9,
    type: "classroom",
    building: "Najd Building",
    floor: "2nd Floor",
    roomNumber: "N210",
    nearestLandmark: "IT Reception",
    directions:
      "Take stairs near IT Reception to 2nd floor, room N210 is opposite the lab area.",
  },
  {
    id: 10,
    type: "classroom",
    building: "Tuwaiq Building",
    floor: "1st Floor",
    roomNumber: "T120",
    nearestLandmark: "Printing Station",
    directions:
      "From Printing Station, turn right and walk down the hall, room T120 on your left.",
  },
  {
    id: 11,
    type: "classroom",
    building: "Tuwaiq Building",
    floor: "2nd Floor",
    roomNumber: "T230",
    nearestLandmark: "Elevator G",
    directions:
      "Take Elevator G to 2nd floor, turn right, room T230 is at the end of the hallway.",
  },
  {
    id: 12,
    type: "classroom",
    building: "Library & Gym",
    floor: "1st Floor",
    roomNumber: "LG102",
    nearestLandmark: "Library Study Zone",
    directions:
      "From Library Study Zone, go straight then left; room LG102 is beside the archives.",
  },
  {
    id: 13,
    type: "classroom",
    building: "Tech Building",
    floor: "2nd Floor",
    roomNumber: "TB205",
    nearestLandmark: "Robotics Display",
    directions:
      "Walk past the Robotics Display, take stairs to 2nd floor, TB205 is on the right.",
  },
  {
    id: 14,
    type: "classroom",
    building: "Tech Building",
    floor: "3rd Floor",
    roomNumber: "TB311",
    nearestLandmark: "Project Lab Entrance",
    directions:
      "Take Elevator C to the 3rd floor, go left, TB311 is next to the Project Lab.",
  },
  {
    id: 15,
    type: "classroom",
    building: "Arts Building",
    floor: "Ground Floor",
    roomNumber: "A012",
    nearestLandmark: "Art Gallery Foyer",
    directions:
      "From the Art Gallery Foyer, walk straight, A012 is the first room on the left.",
  },

  // ===============================
  // LABS
  // ===============================
  {
    id: 16,
    type: "lab",
    building: "Tech Building",
    floor: "1st Floor",
    roomNumber: "L102",
    nearestLandmark: "IT Department",
    directions:
      "Turn right after the IT Department desk, lab L102 is the last door on the left.",
  },
  {
    id: 17,
    type: "lab",
    building: "Main Building",
    floor: "Basement",
    roomNumber: "MB12",
    nearestLandmark: "Engineering Storage",
    directions:
      "Take Elevator D to basement level, follow hallway to the right, lab MB12 is near storage.",
  },
];

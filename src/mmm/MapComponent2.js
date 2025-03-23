import React, { useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import teaIcon from "./tea.png";
import constructionIcon from "./construction.png";
import electricalIcon from "./electrical-service.png";
import plumbingIcon from "./plumbering.png";
import "./App2.css";

let mapInstance = null; // ✅ Prevent multiple map initialization

const MapComponent2 = () => {
    const [markers, setMarkers] = useState([]);

    // ✅ Load markers from localStorage on component load
    useEffect(() => {
        const savedMarkers = JSON.parse(localStorage.getItem("markers")) || [];
        setMarkers(savedMarkers);

        // ✅ Check if map is already initialized
        if (!mapInstance) {
            mapInstance = L.map("map").setView([12.9716, 77.5946], 13);

            L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
                attribution:
                    '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            }).addTo(mapInstance);

            // ✅ Add saved markers to the map
            savedMarkers.forEach((marker) => {
                addMarkerToMap(marker, mapInstance);
            });

            // ✅ Double-click to add a new marker dynamically
            mapInstance.on("dblclick", (e) => {
                handleDoubleClick(e.latlng.lat, e.latlng.lng);
            });
        }
    }, []);

    // ✅ Get the correct icon for the job type
    const getJobIcon = (jobType) => {
        switch (jobType) {
            case "farm work":
                return teaIcon;
            case "mason":
                return constructionIcon;
            case "electrician":
                return electricalIcon;
            case "plumbing":
                return plumbingIcon;
            default:
                return teaIcon;
        }
    };

    // ✅ Create custom icon
    const createCustomIcon = (jobType) => {
        return L.icon({
            iconUrl: getJobIcon(jobType),
            iconSize: [32, 32],
            iconAnchor: [16, 32],
            popupAnchor: [0, -32],
        });
    };

    // ✅ Add marker to map with popup
    const addMarkerToMap = (marker, mapInstance) => {
        const { lat, lng, jobType, duration, salary } = marker;

        L.marker([lat, lng], { icon: createCustomIcon(jobType) })
            .addTo(mapInstance)
            .bindPopup(
                `<b>Type of Job:</b> ${jobType}<br/>
                 <b>Duration:</b> ${duration}<br/>
                 <b>Salary:</b> ${salary}`
            );
    };

    // ✅ Handle double-click to add a marker dynamically
    const handleDoubleClick = (lat, lng) => {
        const jobType = prompt(
            "Enter the type of job (farm work, mason, electrician, plumbing):",
            "farm work"
        );
        const duration = prompt("Enter duration of the job (e.g., 1 month):");
        const salary = prompt("Enter salary for the job:");

        if (jobType && duration && salary) {
            const newMarker = {
                lat,
                lng,
                jobType,
                duration,
                salary,
            };

            // ✅ Add the new marker to the map and localStorage
            const updatedMarkers = [...markers, newMarker];
            setMarkers(updatedMarkers);
            localStorage.setItem("markers", JSON.stringify(updatedMarkers));

            addMarkerToMap(newMarker, mapInstance);
        } else {
            alert("Please fill in all the details to add a marker!");
        }
    };

    return (
        <div className="container">
            <h2>Double-click on the map to add a marker with job details</h2>
            <div id="map" style={{ height: "500px", width: "100%" }}></div>
        </div>
    );
};

export default MapComponent2;

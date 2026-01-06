import { Typography } from "@mui/material";
import { useCallback, useEffect, useRef, useState } from "react";

import styles from "./KeyboardListener.module.css";

function KeyboardListener({ isCollapsiblePanelClosed, setIsCollapsiblePanelClosed }) {
    // const [showPanelPopup, setShowPanelPopup] = useState(false);
    // const hideTimerRef = useRef(null);
    
    const panelPopupText = isCollapsiblePanelClosed ? "Graph Closed" : "Graph Opened";
    
    const handleGlobalKeyDown = useCallback((e) => {
        if (["INPUT", "TEXTAREA"].includes(e.target.tagName) || e.target.isContentEditable) {
            return;
        }

        if (e.key === " ") {
            e.preventDefault();
            setIsCollapsiblePanelClosed(prev => !prev);

            // setShowPanelPopup(true);
            // if (hideTimerRef.current) clearTimeout(hideTimerRef.current);
            // hideTimerRef.current = setTimeout(() => setShowPanelPopup(false), 1000);
        }
    }, [setIsCollapsiblePanelClosed]);

    useEffect(() => {
        document.addEventListener('keydown', handleGlobalKeyDown);

        return () => document.removeEventListener('keydown', handleGlobalKeyDown);
    }, [handleGlobalKeyDown]);

    return (
        <></>
        // <div className={`${styles.notificationPopup} ${showPanelPopup ? styles.show : styles.hide}`}>
        //     <Typography>{panelPopupText}</Typography>
        // </div>
    );
}

export default KeyboardListener;
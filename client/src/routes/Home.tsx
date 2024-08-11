import React from "react";
import { MergeClasses } from "@/common/utilities.ts";

import styles from "@/styles/App.module.scss";

/**
 * Dumb component to render the home page.
 * @constructor
 */
const Home: React.FC<LibraryComponent> = () => (
    <div className={MergeClasses('borderedContainer', styles.notFoundContainer)}>
        <h1>Welcome to CognitoMart!</h1>
        <p>Welcome to CognitoMart, your go-to destination for exploring the technical assessment by Gav. This project showcases my approach to solving the supermarket brief, demonstrating my skills and understanding of key technologies.</p>
        <p>For clarification of design decisions, please refer to the <b>readme.md</b> at the root of the project.</p>
        <p>If you have any questions, feedback, or need further clarification on any aspect of the project, please feel free to reach out. I'm happy to discuss the project in more detail or address any questions you might have.</p>
        <p>Thank you for the opportunity to take part in this assessment and for taking the time to review my work. I hope you like it!</p>
    </div>
);

export default Home;
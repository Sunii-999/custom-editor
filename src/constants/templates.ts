export const templates = [
    {
      id: "blank",
      label: "Blank Document",
      imageUrl: "/blank-document.svg",
      initialContent: `<p></p>`,
    },
    {
      id: "software-proposal",
      label: "Software Development Proposal",
      imageUrl: "/software-proposal.svg",
      initialContent: `
        <h1>Software Development Proposal</h1>
        <p>Prepared by: [Your Name]</p>
        <p>Date: [Insert Date]</p>
        <h2>Introduction</h2>
        <p>Provide an overview of the project and its goals.</p>
        <h2>Scope</h2>
        <p>Define the scope of the software and deliverables.</p>
        <h2>Timeline</h2>
        <p>Outline the proposed timeline and milestones.</p>
      `,
    },
    {
      id: "project-proposal",
      label: "Project Proposal",
      imageUrl: "/project-proposal.svg",
      initialContent: `
        <h1>Project Proposal</h1>
        <p>Prepared for: [Client/Organization]</p>
        <p>Prepared by: [Your Name]</p>
        <h2>Objective</h2>
        <p>State the primary objectives of the project.</p>
        <h2>Methodology</h2>
        <p>Explain how the project will be executed.</p>
        <h2>Expected Outcomes</h2>
        <p>List the expected deliverables and benefits.</p>
      `,
    },
    {
      id: "business-letter",
      label: "Business Letter",
      imageUrl: "/business-letter.svg",
      initialContent: `
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP Code]</p>
        <p>[Date]</p>
        <p>[Recipient Name]</p>
        <p>[Recipient Title]</p>
        <p>[Company]</p>
        <p>[Address]</p>
        <br/>
        <p>Dear [Recipient Name],</p>
        <p>[Body of the letter]</p>
        <p>Sincerely,</p>
        <p>[Your Name]</p>
      `,
    },
    {
      id: "cover-letter",
      label: "Cover Letter",
      imageUrl: "/cover-letter.svg",
      initialContent: `
        <h1>Cover Letter</h1>
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP Code]</p>
        <p>[Date]</p>
        <p>[Employer's Name]</p>
        <p>[Company Name]</p>
        <p>[Address]</p>
        <br/>
        <p>Dear [Employer's Name],</p>
        <p>[Introduce yourself and the position you're applying for.]</p>
        <p>[Highlight your skills and experience relevant to the role.]</p>
        <p>[Explain why you are interested in this company.]</p>
        <p>Sincerely,</p>
        <p>[Your Name]</p>
      `,
    },
    {
      id: "letter",
      label: "Letter",
      imageUrl: "/letter.svg",
      initialContent: `
        <p>[Your Name]</p>
        <p>[Your Address]</p>
        <p>[City, State ZIP Code]</p>
        <p>[Date]</p>
        <p>[Recipient Name]</p>
        <br/>
        <p>Dear [Recipient Name],</p>
        <p>[Body of the letter]</p>
        <p>Sincerely,</p>
        <p>[Your Name]</p>
      `,
    },
    {
      id: "resume",
      label: "Resume",
      imageUrl: "/resume.svg",
      initialContent: `
        <h1>[Your Name]</h1>
        <p>[Your Address] | [Your Phone Number] | [Your Email]</p>
        <h2>Summary</h2>
        <p>[Brief summary of your experience and skills.]</p>
        <h2>Experience</h2>
        <p><strong>[Job Title]</strong> — [Company Name]</p>
        <p>[Dates of Employment]</p>
        <ul>
          <li>[Responsibility/Accomplishment 1]</li>
          <li>[Responsibility/Accomplishment 2]</li>
        </ul>
        <h2>Education</h2>
        <p>[Degree], [Institution], [Year]</p>
        <h2>Skills</h2>
        <ul>
          <li>[Skill 1]</li>
          <li>[Skill 2]</li>
        </ul>
      `,
    },
  ];
  
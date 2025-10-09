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
        <h1 style="font-size: 32px; text-align: center; margin-bottom: 5px; color: #1f4e79; font-weight: 700;">Software Development Proposal</h1>
        <p style="text-align: center; color: #777; margin-bottom: 5px;">Prepared by: [Your Name]</p>
        <p style="text-align: center; color: #777; margin-bottom: 35px;">Date: [Insert Date]</p>
        
        <h2 style="font-size: 22px; border-bottom: 3px solid #1f4e79; padding-bottom: 5px; margin-top: 30px; color: #333;">1. Introduction</h2>
        <p>Provide an overview of the project and its goals.</p>
        
        <h2 style="font-size: 22px; border-bottom: 3px solid #1f4e79; padding-bottom: 5px; margin-top: 30px; color: #333;">2. Scope</h2>
        <p>Define the scope of the software and deliverables.</p>
        
        <h2 style="font-size: 22px; border-bottom: 3px solid #1f4e79; padding-bottom: 5px; margin-top: 30px; color: #333;">3. Timeline</h2>
        <p style="font-weight: 500; margin-bottom: 5px;">Outline the proposed timeline and milestones:</p>
        <ul style="color: #444;">
          <li>Phase 1: Discovery (<span style="color: #1f4e79; font-weight: 600;">4 weeks</span>)</li>
          <li>Phase 2: Development (<span style="color: #1f4e79; font-weight: 600;">12 weeks</span>)</li>
          <li>Phase 3: Deployment (<span style="color: #1f4e79; font-weight: 600;">2 weeks</span>)</li>
        </ul>
      `,
    },
    {
      id: "project-proposal",
      label: "Project Proposal",
      imageUrl: "/project-proposal.svg",
      initialContent: `
        <h1 style="font-size: 36px; text-align: center; margin-bottom: 10px; color: #1f4e79; letter-spacing: 1px;">PROJECT PROPOSAL</h1>
        <p style="text-align: center; font-size: 18px; margin-bottom: 5px; font-weight: 500;">Prepared for: [Client/Organization]</p>
        <p style="text-align: center; color: #777; margin-bottom: 45px;">Prepared by: [Your Name]</p>
        
        <h2 style="font-size: 26px; margin-top: 25px; color: #1f4e79; font-weight: 600;">1. Objective</h2>
        <p style="font-style: italic; color: #444;">State the primary objectives of the project clearly and concisely.</p>
        
        <h2 style="font-size: 26px; margin-top: 25px; color: #1f4e79; font-weight: 600;">2. Methodology</h2>
        <p>Explain how the project will be executed, focusing on the steps and techniques to be used.</p>
        
        <h2 style="font-size: 26px; margin-top: 25px; color: #1f4e79; font-weight: 600;">3. Expected Outcomes</h2>
        <ul style="color: #333;">
          <li><strong style="color: #1f4e79;">Deliverable A:</strong> Fully functional beta.</li>
          <li><strong style="color: #1f4e79;">Deliverable B:</strong> Comprehensive final report.</li>
          <li><strong style="color: #1f4e79;">Benefit C:</strong> Reduction in operational costs by 15%.</li>
        </ul>
      `,
    },
    {
      id: "business-letter",
      label: "Business Letter",
      imageUrl: "/business-letter.svg",
      initialContent: `
        <p style="font-size: 14px; margin-bottom: 3px; font-weight: 500;">[Your Name]</p>
        <p style="font-size: 14px; margin-bottom: 3px; color: #777;">[Your Address]</p>
        <p style="font-size: 14px; margin-bottom: 3px; color: #777;">[City, State ZIP Code]</p>
        <p style="margin-bottom: 25px; color: #777;">[Date]</p>
        
        <p style="margin-bottom: 3px; font-weight: 500;">[Recipient Name]</p>
        <p style="margin-bottom: 3px; color: #777;">[Recipient Title]</p>
        <p style="margin-bottom: 3px; color: #777;">[Company]</p>
        <p style="margin-bottom: 30px; color: #777;">[Address]</p>
        
        <p style="font-weight: bold; margin-bottom: 15px; color: #1f4e79;">Subject: [Insert Subject Line]</p>
        
        <p style="margin-bottom: 10px;">Dear [Recipient Name],</p>
        <p style="margin-bottom: 25px;">[Body of the letter - Use clear, concise paragraphs.]</p>
        
        <p style="margin-bottom: 50px;">Sincerely,</p>
        <p style="font-weight: 500;">[Your Name]</p>
      `,
    },
    {
      id: "cover-letter",
      label: "Cover Letter",
      imageUrl: "/cover-letter.svg",
      initialContent: `
        <h1 style="font-size: 20px; text-align: right; margin-bottom: 0; color: #1f4e79; font-weight: 700;">[Your Name]</h1>
        <p style="text-align: right; font-size: 14px; color: #777; margin-bottom: 30px; border-bottom: 1px solid #ccc; padding-bottom: 5px;">[Your Address] | [Your Phone] | [Your Email]</p>
        
        <p style="margin-bottom: 5px;">[Date]</p>
        <p style="margin-bottom: 3px; font-weight: 500;">[Employer's Name]</p>
        <p style="margin-bottom: 3px; color: #444;">[Company Name]</p>
        <p style="margin-bottom: 30px; color: #444;">[Address]</p>
        
        <p style="font-weight: bold; font-size: 18px; margin-bottom: 15px;">Dear [Employer's Name],</p>
        
        <p style="margin-bottom: 15px;">I am writing to express my enthusiastic interest in the <span style="font-weight: bold; color: #1f4e79;">[Position Name]</span> role at [Company Name], as advertised on [Platform].</p>
        
        <p style="margin-bottom: 15px;">My background in [Relevant Skill] and my proven ability to [Key Achievement] make me a strong candidate. I am particularly excited about [Specific Company Detail/Project].</p>
        
        <p style="margin-bottom: 40px;">Thank you for your time and consideration. I look forward to the opportunity to discuss my qualifications further.</p>
        
        <p style="font-weight: 500;">Sincerely,</p>
        <p>[Your Name]</p>
      `,
    },
    {
      id: "letter",
      label: "Letter",
      imageUrl: "/letter.svg",
      initialContent: `
        <p style="text-align: right; margin-bottom: 3px; font-weight: 500;">[Your Name]</p>
        <p style="text-align: right; margin-bottom: 3px; color: #777;">[Your Address]</p>
        <p style="text-align: right; margin-bottom: 30px; color: #777;">[Date]</p>
        
        <p style="margin-bottom: 5px; font-weight: 500;">[Recipient Name]</p>
        <p style="margin-bottom: 25px; color: #777;">[Recipient Address]</p>
        
        <p style="margin-bottom: 15px; font-weight: 500; color: #1f4e79;">Dear [Recipient Name],</p>
        
        <p style="text-indent: 40px; margin-bottom: 20px;">[Body of the letter - Start with an opening paragraph. Use clear paragraphs and spacing to convey your message.]</p>
        
        <p style="text-indent: 40px; margin-bottom: 20px;">[Second paragraph here.]</p>
        
        <p style="margin-bottom: 40px;">Warmly,</p>
        <p style="font-weight: 500;">[Your Name]</p>
      `,
    },
    {
      id: "resume",
      label: "Resume",
      imageUrl: "/resume.svg",
      initialContent: `
        <h1 style="font-size: 38px; text-align: center; margin-bottom: 0; color: #1f4e79; font-weight: 700; letter-spacing: 2px;">[YOUR NAME]</h1>
        <p style="text-align: center; font-size: 14px; color: #777; margin-bottom: 25px; padding-bottom: 5px; border-bottom: 2px solid #ccc;">[City, State] | [Phone Number] | [Email] | [LinkedIn/Portfolio URL]</p>
        
        <h2 style="font-size: 20px; font-weight: 700; border-bottom: 2px solid #1f4e79; padding-bottom: 3px; margin-top: 25px; color: #333;">PROFESSIONAL SUMMARY</h2>
        <p>[A short, powerful paragraph summarizing your career goals and key achievements.]</p>
        
        <h2 style="font-size: 20px; font-weight: 700; border-bottom: 2px solid #1f4e79; padding-bottom: 3px; margin-top: 25px; color: #333;">EXPERIENCE</h2>
        <p style="margin-bottom: 3px;"><strong>Senior Developer</strong> — Tech Solutions, Inc. | <span style="color: #777; font-style: italic;">Jan 2020 – Present</span></p>
        <ul style="list-style-type: disc; margin-left: 20px; color: #444;">
          <li>Achieved X by implementing Y, resulting in Z% efficiency.</li>
          <li>Led a team of 5 engineers on a critical infrastructure project.</li>
        </ul>
        
        <p style="margin-top: 15px; margin-bottom: 3px;"><strong>Developer</strong> — Startup XYZ | <span style="color: #777; font-style: italic;">Aug 2017 – Dec 2019</span></p>
        <ul style="list-style-type: disc; margin-left: 20px; margin-bottom: 20px; color: #444;">
          <li>Built the V1 product, scaling user base to 10k+.</li>
        </ul>
        
        <h2 style="font-size: 20px; font-weight: 700; border-bottom: 2px solid #1f4e79; padding-bottom: 3px; margin-top: 25px; color: #333;">EDUCATION</h2>
        <p style="margin-bottom: 3px;"><strong>B.S. Computer Science</strong> | State University | <span style="color: #777;">2013 – 2017</span></p>
        <p style="font-size: 14px; color: #555;">*Graduated with Honors.*</p>
        
        <h2 style="font-size: 20px; font-weight: 700; border-bottom: 2px solid #1f4e79; padding-bottom: 3px; margin-top: 25px; color: #333;">SKILLS</h2>
        <p><strong>Languages:</strong> JavaScript, Python, C++ | <strong>Frameworks:</strong> React, Node.js, Django | <strong>Tools:</strong> Git, AWS, Docker</p>
      `,
    },
];
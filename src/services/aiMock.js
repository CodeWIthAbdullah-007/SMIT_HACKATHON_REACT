// Mock AI Issue Triage Service (Rule-based as allowed for Track B)
export const generateAiTriage = (complaint) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const text = complaint.toLowerCase();
      let triage = {
        title: "General Maintenance Required",
        category: "General",
        priority: "Medium",
        causes: ["Wear and tear", "Requires physical inspection"],
        checks: ["Check power connection", "Inspect for physical damage"]
      };

      if (text.includes("projector") || text.includes("hdmi") || text.includes("flickering")) {
        triage = {
          title: "Display Flickering & Intermittent HDMI Signal Loss",
          category: "Hardware / Display",
          priority: "High",
          causes: ["Damaged HDMI cable", "Loose port connection", "Projector lamp nearing end of life"],
          checks: ["Verify HDMI cable integrity", "Check port connections", "Inspect lamp hours"]
        };
      } else if (text.includes("ac") || text.includes("leaking") || text.includes("cooling")) {
        triage = {
          title: "Water Leakage and Reduced Cooling",
          category: "Leakage / Performance",
          priority: "High",
          causes: ["Blocked drain pipe", "Dirty filter", "Frozen coil"],
          checks: ["Turn off unit if water near electricals", "Inspect drainage", "Check filter condition"]
        };
      } else if (text.includes("noise") || text.includes("sound")) {
        triage = {
          title: "Unusual Noise Reported",
          category: "Mechanical / Noise",
          priority: "Medium",
          causes: ["Loose parts", "Fan obstruction", "Motor bearing wear"],
          checks: ["Inspect for loose screws", "Check fan blades", "Lubricate moving parts"]
        };
      }

      resolve(triage);
    }, 1500); // Simulate network delay
  });
};
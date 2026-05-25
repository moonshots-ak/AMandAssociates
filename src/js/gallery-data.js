/* =============================================================
   AMA — Gallery Data File
   gallery-data.js

   *** HOW TO ADD A NEW PHOTO — Read this first! ***

   STEP 1: Drag your photo into the folder:
           src/assets/gallery/

   STEP 2: Add ONE new line inside the array below.
           Copy any existing line as a template.

   STEP 3: Fill in three fields:
           file     — the exact filename (e.g. "team-lunch.jpg")
           caption  — a short description (or leave "" empty)
           category — pick ONE: "office"  "team"  "events"
                      (if unsure, use "office")

   STEP 4: Save this file, then commit it to GitHub.
           The website will update automatically in about 1 minute.

   EXAMPLE of a new entry (copy the pattern exactly):
   { file: "new-photo.jpg", caption: "New Caption Here", category: "team" },

   ============================================================= */

var galleryImages = [

  /* ── Office ── */
  { file: "office-reception.jpg",  caption: "Our Reception",          category: "office" },
  { file: "office-workspace.jpg",  caption: "Workspace",              category: "office" },
  { file: "office-cabin.jpg",      caption: "Principal's Cabin",      category: "office" },
  { file: "office-library.jpg",    caption: "Reference Library",      category: "office" },

  /* ── Team ── */
  { file: "team-meeting.jpg",      caption: "Weekly Team Briefing",   category: "team"   },
  { file: "team-workshop.jpg",     caption: "Training Session",       category: "team"   },
  { file: "team-group.jpg",        caption: "Team AMA",               category: "team"   },

  /* ── Events ── */
  { file: "event-diwali.jpg",      caption: "Diwali Celebrations",    category: "events" },
  { file: "event-annual.jpg",      caption: "Annual Client Meet",     category: "events" },
  { file: "event-seminar.jpg",     caption: "Tax Seminar 2025",       category: "events" },

];

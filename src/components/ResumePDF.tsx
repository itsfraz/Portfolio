import { Document, Page, Text, View, StyleSheet, Link } from '@react-pdf/renderer';
import { PROFILE, EXPERIENCE, EDUCATION, PROJECTS, SKILLS } from '../data/portfolioData';

// Select top 3 projects to guarantee proper A4 fit
const TOP_PROJECTS = PROJECTS.slice(0, 3);

// Dynamic fitting logic based on data length
function getDynamicStyles() {
  const bulletPointsCount = EXPERIENCE.reduce((acc, curr) => acc + curr.description.length, 0);
  const educationCount = EDUCATION.length;
  const projectCount = TOP_PROJECTS.length;
  
  // Total density calculation (excluding certifications as they are removed)
  const totalContentPoints = bulletPointsCount + educationCount + projectCount;

  let fontSize = 9.8;
  let sectionMargin = 13;
  let itemMargin = 7;
  let padding = 34;
  let lineHeight = 1.4;
  let nameSize = 22;
  let titleSize = 12;

  if (totalContentPoints > 12) {
    // Tight layout for large content sets
    fontSize = 8.5;
    sectionMargin = 8;
    itemMargin = 4.5;
    padding = 28;
    lineHeight = 1.25;
    nameSize = 18;
    titleSize = 10.5;
  } else if (totalContentPoints < 8) {
    // Relaxed layout to occupy space nicely
    fontSize = 11;
    sectionMargin = 18;
    itemMargin = 12;
    padding = 44;
    lineHeight = 1.55;
    nameSize = 26;
    titleSize = 14;
  }

  return StyleSheet.create({
    page: {
      padding: padding,
      fontSize: fontSize,
      fontFamily: 'Helvetica',
      color: '#0f172a', // Dark text color
      lineHeight: lineHeight,
    },
    header: {
      marginBottom: sectionMargin,
      borderBottom: '1px solid #94a3b8', // Darker border
      paddingBottom: 8,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a', // Dark text
      letterSpacing: 0.5,
    },
    title: {
      fontSize: titleSize,
      color: '#1d4ed8', // Rich dark blue primary accent color
      fontFamily: 'Helvetica-Bold',
      marginTop: 12, // Increased spacing between name and title
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
      fontSize: fontSize - 1,
      color: '#1e293b', // Darker text for contact details
    },
    section: {
      marginBottom: sectionMargin,
    },
    sectionTitle: {
      fontSize: fontSize + 1.5,
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a', // Dark text
      borderBottom: '1px solid #475569', // Darker separator
      paddingBottom: 2,
      marginBottom: sectionMargin / 2,
      textTransform: 'uppercase',
      letterSpacing: 0.5,
    },
    entry: {
      marginBottom: itemMargin,
    },
    entryHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      fontFamily: 'Helvetica-Bold',
      color: '#0f172a', // Dark text
      fontSize: fontSize,
    },
    entrySubheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#1e293b', // Darker text
      fontSize: fontSize - 0.5,
      marginTop: 1.5,
    },
    institution: {
      fontFamily: 'Helvetica-Oblique',
    },
    date: {
      fontFamily: 'Helvetica',
    },
    bulletList: {
      marginTop: 3,
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 2.5,
      fontSize: fontSize - 1,
      color: '#1e293b', // Darker text
    },
    bulletSign: {
      width: 10,
      fontFamily: 'Helvetica-Bold',
    },
    bulletText: {
      flex: 1,
    },
    skillsRow: {
      flexDirection: 'row',
      marginBottom: 3,
    },
    skillsLabel: {
      width: 110,
      fontFamily: 'Helvetica-Bold',
      fontSize: fontSize - 0.5,
      color: '#0f172a', // Dark text
    },
    skillsValue: {
      flex: 1,
      fontSize: fontSize - 1,
      color: '#1e293b', // Darker text
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projectTitle: {
      fontFamily: 'Helvetica-Bold',
      fontSize: fontSize - 0.5,
      color: '#0f172a', // Dark text
    },
    projectLink: {
      fontSize: fontSize - 1,
      color: '#1d4ed8',
      fontFamily: 'Helvetica-Bold',
      textDecoration: 'none',
    },
    projectDesc: {
      fontSize: fontSize - 1,
      color: '#1e293b', // Darker text
      marginTop: 1.5,
      lineHeight: 1.35,
    }
  });
}

export default function ResumePDF() {
  const styles = getDynamicStyles();

  return (
    <Document title={`${PROFILE.name.replace(/\s+/g, '_')}_Resume.pdf`} author={PROFILE.name}>
      <Page size="A4" style={styles.page}>
        
        {/* Header / Contact Info */}
        <View style={styles.header}>
          <Text style={styles.name}>{PROFILE.name}</Text>
          <Text style={styles.title}>{PROFILE.title}</Text>
          <View style={styles.contactRow}>
            <Text>{PROFILE.email}   |   {PROFILE.phone}   |   {PROFILE.location}   |   {PROFILE.github}   |   {PROFILE.linkedin}</Text>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={{ fontSize: styles.page.fontSize ? (styles.page.fontSize as number) - 0.8 : 9, color: '#1e293b', lineHeight: 1.4 }}>
            {PROFILE.summary}
          </Text>
        </View>

        {/* Experience */}
        {EXPERIENCE.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Work Experience</Text>
            {EXPERIENCE.map((exp, idx) => (
              <View key={idx} style={styles.entry}>
                <View style={styles.entryHeader}>
                  <Text>{exp.title}</Text>
                  <Text style={styles.date}>{exp.duration}</Text>
                </View>
                <View style={styles.entrySubheader}>
                  <Text style={styles.institution}>{exp.company}</Text>
                  <Text>{exp.location}</Text>
                </View>
                <View style={styles.bulletList}>
                  {exp.description.map((bullet, bulletIdx) => (
                    <View key={bulletIdx} style={styles.bulletPoint}>
                      <Text style={styles.bulletSign}>•</Text>
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Education */}
        {EDUCATION.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Education</Text>
            {EDUCATION.map((edu, idx) => (
              <View key={idx} style={[styles.entry, { marginBottom: idx === EDUCATION.length - 1 ? 0 : styles.entry.marginBottom }]}>
                <View style={styles.entryHeader}>
                  <Text>{edu.degree}</Text>
                  <Text style={styles.date}>{edu.duration}</Text>
                </View>
                <View style={styles.entrySubheader}>
                  <Text style={styles.institution}>{edu.institution}</Text>
                  <Text>{edu.location}</Text>
                </View>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Skills & Expertise</Text>
          <View style={styles.skillsRow}>
            <Text style={styles.skillsLabel}>Frontend:</Text>
            <Text style={styles.skillsValue}>
              {SKILLS.frontend.map(s => s.name).join(', ')}
            </Text>
          </View>
          <View style={styles.skillsRow}>
            <Text style={styles.skillsLabel}>Backend & Database:</Text>
            <Text style={styles.skillsValue}>
              {SKILLS.backend.map(s => s.name).join(', ')}
            </Text>
          </View>
          <View style={styles.skillsRow}>
            <Text style={styles.skillsLabel}>Tools & Deployments:</Text>
            <Text style={styles.skillsValue}>
              {SKILLS.tools.join(', ')}
            </Text>
          </View>
        </View>

        {/* Projects */}
        {TOP_PROJECTS.length > 0 && (
          <View style={[styles.section, { marginBottom: 0 }]}>
            <Text style={styles.sectionTitle}>Key Projects</Text>
            {TOP_PROJECTS.map((proj, idx) => (
              <View key={idx} style={{ marginBottom: idx === TOP_PROJECTS.length - 1 ? 0 : 8 }}>
                <View style={styles.projectHeader}>
                  <Text style={styles.projectTitle}>
                    {proj.title} <Text style={{ fontFamily: 'Helvetica-Oblique', color: '#475569', fontSize: styles.projectTitle.fontSize ? (styles.projectTitle.fontSize as number) - 0.5 : 8.5 }}>({proj.tags.join(', ')})</Text>
                  </Text>
                  {proj.liveUrl && (
                    <Link src={proj.liveUrl} style={styles.projectLink}>
                      Live Demo ↗
                    </Link>
                  )}
                </View>
                <Text style={styles.projectDesc}>{proj.description}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
}

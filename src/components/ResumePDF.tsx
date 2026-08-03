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
      fontFamily: 'Times-Roman',
      color: '#000000', // Pure black text color
      lineHeight: lineHeight,
    },
    header: {
      marginBottom: sectionMargin,
      borderBottom: '1px dashed #000000', // Crisp black border
      paddingBottom: 8,
    },
    name: {
      fontSize: nameSize,
      fontFamily: 'Times-Bold',
      color: '#000000',
      letterSpacing: 0.5,
    },
    title: {
      fontSize: titleSize,
      color: '#000000',
      fontFamily: 'Times-Bold',
      marginTop: 12,
    },
    contactRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginTop: 8,
      fontSize: fontSize - 1,
      color: '#000000',
    },
    headerLink: {
      color: '#000000',
      fontFamily: 'Times-Bold',
      textDecoration: 'underline',
    },
    section: {
      marginBottom: sectionMargin,
    },
    sectionTitle: {
      fontSize: fontSize + 1.5,
      fontFamily: 'Times-Bold',
      color: '#000000',
      borderBottom: '1px solid #000000',
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
      fontFamily: 'Times-Bold',
      color: '#000000',
      fontSize: fontSize,
    },
    entrySubheader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      color: '#000000',
      fontSize: fontSize - 0.5,
      marginTop: 1.5,
    },
    institution: {
      fontFamily: 'Times-Italic',
    },
    date: {
      fontFamily: 'Times-Roman',
    },
    bulletList: {
      marginTop: 3,
    },
    bulletPoint: {
      flexDirection: 'row',
      marginBottom: 2.5,
      fontSize: fontSize - 1,
      color: '#000000',
    },
    bulletSign: {
      width: 10,
      fontFamily: 'Times-Bold',
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
      fontFamily: 'Times-Bold',
      fontSize: fontSize - 0.5,
      color: '#000000',
    },
    skillsValue: {
      flex: 1,
      fontSize: fontSize - 1,
      color: '#000000',
    },
    projectHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    projectTitle: {
      fontFamily: 'Times-Bold',
      fontSize: fontSize - 0.5,
      color: '#000000',
    },
    projectLink: {
      fontSize: fontSize - 1,
      color: '#000000',
      fontFamily: 'Times-Bold',
      textDecoration: 'underline',
    },
    projectDesc: {
      fontSize: fontSize - 1,
      color: '#000000',
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
            <Text>{PROFILE.email}   |   {PROFILE.phone}   |   {PROFILE.location}   |   </Text>
            <Link src={PROFILE.github.startsWith('http') ? PROFILE.github : `https://${PROFILE.github}`} style={styles.headerLink}>
              GitHub ↗
            </Link>
            <Text>   |   </Text>
            <Link src={PROFILE.linkedin.startsWith('http') ? PROFILE.linkedin : `https://${PROFILE.linkedin}`} style={styles.headerLink}>
              LinkedIn ↗
            </Link>
          </View>
        </View>

        {/* Profile Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={{ fontSize: styles.page.fontSize ? (styles.page.fontSize as number) - 0.8 : 9, color: '#000000', lineHeight: 1.4 }}>
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
                    {proj.title} <Text style={{ fontFamily: 'Times-Italic', color: '#000000', fontSize: styles.projectTitle.fontSize ? (styles.projectTitle.fontSize as number) - 0.5 : 8.5 }}>({proj.tags.join(', ')})</Text>
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

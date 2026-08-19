const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding Mailsi Telehealth & Clinic Queue Platform database...");

  // 1. Create Admin User
  const adminUser = await prisma.user.upsert({
    where: { phone: "03000000000" },
    update: {},
    create: {
      phone: "03000000000",
      fullName: "Mailsi Pilot Admin (Ops)",
      role: "ADMIN",
    },
  });

  // 2. Create Doctors
  const doctor1User = await prisma.user.upsert({
    where: { phone: "03001111111" },
    update: {},
    create: {
      phone: "03001111111",
      fullName: "Dr. Muhammad Tariq",
      role: "DOCTOR",
      doctorProfile: {
        create: {
          pmdcNumber: "PMDC-45892-P",
          specialization: "Child Specialist & Pediatrician",
          qualification: "MBBS, FCPS (Pediatrics)",
          city: "Mailsi",
          hospitalOrClinic: "THQ Hospital Mailsi / Tariq Child Clinic",
          consultationFee: 1000,
          isOnlineForOpd: true,
          opdStartTime: "17:00",
          opdEndTime: "21:00",
          currentOpdToken: 1,
          totalTokensIssued: 8,
        },
      },
    },
    include: { doctorProfile: true },
  });

  const doctor2User = await prisma.user.upsert({
    where: { phone: "03002222222" },
    update: {},
    create: {
      phone: "03002222222",
      fullName: "Dr. Farzana Kausar",
      role: "DOCTOR",
      doctorProfile: {
        create: {
          pmdcNumber: "PMDC-32910-P",
          specialization: "Gynecologist & Obstetrician",
          qualification: "MBBS, MCPS (Gynae/Obs)",
          city: "Mailsi",
          hospitalOrClinic: "Mailsi Maternity Hospital & Clinic",
          consultationFee: 1200,
          isOnlineForOpd: false,
          opdStartTime: "16:00",
          opdEndTime: "20:00",
          currentOpdToken: 0,
          totalTokensIssued: 5,
        },
      },
    },
    include: { doctorProfile: true },
  });

  const doctor3User = await prisma.user.upsert({
    where: { phone: "03003333333" },
    update: {},
    create: {
      phone: "03003333333",
      fullName: "Dr. Shahzad Ahmad",
      role: "DOCTOR",
      doctorProfile: {
        create: {
          pmdcNumber: "PMDC-51204-P",
          specialization: "General Physician & Diabetologist",
          qualification: "MBBS, MD (Internal Medicine)",
          city: "Mailsi",
          hospitalOrClinic: "Shifa Clinic, Quaid-e-Azam Road, Mailsi",
          consultationFee: 800,
          isOnlineForOpd: true,
          opdStartTime: "18:00",
          opdEndTime: "22:00",
          currentOpdToken: 0,
          totalTokensIssued: 12,
        },
      },
    },
    include: { doctorProfile: true },
  });

  const doctor4User = await prisma.user.upsert({
    where: { phone: "03004444444" },
    update: {},
    create: {
      phone: "03004444444",
      fullName: "Dr. Kamran Malik",
      role: "DOCTOR",
      doctorProfile: {
        create: {
          pmdcNumber: "PMDC-18239-P",
          specialization: "Consultant Cardiologist",
          qualification: "MBBS, FCPS (Cardiology), FACC",
          city: "Multan",
          hospitalOrClinic: "Fatima Medical Complex / Nishtar Road Multan",
          consultationFee: 2000,
          isOnlineForOpd: true,
          opdStartTime: "20:00",
          opdEndTime: "22:00",
          currentOpdToken: 0,
          totalTokensIssued: 4,
        },
      },
    },
    include: { doctorProfile: true },
  });

  // 3. Create Pharmacies in Mailsi Catchment
  const pharmacy1User = await prisma.user.upsert({
    where: { phone: "03005555555" },
    update: {},
    create: {
      phone: "03005555555",
      fullName: "Muhammad Aslam (Pharmacy Agent)",
      role: "PHARMACY_AGENT",
      pharmacy: {
        create: {
          storeName: "Al-Madina Medical Store",
          ownerName: "Muhammad Aslam",
          locationArea: "Mitro",
          distanceFromCity: 18,
          walletBalance: 1860.0, // 2 unremitted bookings (2 * 930)
          totalCommission: 140.0, // 2 * 70
          creditLimit: 5000.0,
        },
      },
    },
    include: { pharmacy: true },
  });

  const pharmacy2User = await prisma.user.upsert({
    where: { phone: "03006666666" },
    update: {},
    create: {
      phone: "03006666666",
      fullName: "Hafiz Rashid (Pharmacy Agent)",
      role: "PHARMACY_AGENT",
      pharmacy: {
        create: {
          storeName: "Bismillah Pharmacy & Clinic",
          ownerName: "Hafiz Rashid",
          locationArea: "Karampur",
          distanceFromCity: 22,
          walletBalance: 930.0,
          totalCommission: 70.0,
          creditLimit: 5000.0,
        },
      },
    },
    include: { pharmacy: true },
  });

  const pharmacy3User = await prisma.user.upsert({
    where: { phone: "03007777777" },
    update: {},
    create: {
      phone: "03007777777",
      fullName: "Tariq Mehmood (Pharmacy Agent)",
      role: "PHARMACY_AGENT",
      pharmacy: {
        create: {
          storeName: "Al-Rehman Medical Hall",
          ownerName: "Tariq Mehmood",
          locationArea: "Jallah Jeem (River Belt)",
          distanceFromCity: 24,
          walletBalance: 0.0,
          totalCommission: 0.0,
          creditLimit: 5000.0,
        },
      },
    },
    include: { pharmacy: true },
  });

  // 4. Create Sample Patients & Active Bookings
  const patient1 = await prisma.user.upsert({
    where: { phone: "03011234567" },
    update: {},
    create: {
      phone: "03011234567",
      fullName: "Abdul Ghafoor",
      role: "PATIENT",
    },
  });

  const patient2 = await prisma.user.upsert({
    where: { phone: "03029876543" },
    update: {},
    create: {
      phone: "03029876543",
      fullName: "Khadija Bibi (Mother of Zain)",
      role: "PATIENT",
    },
  });

  // Sample Remote Appointment
  const apt1 = await prisma.appointment.upsert({
    where: { id: "apt-demo-001" },
    update: {},
    create: {
      id: "apt-demo-001",
      tokenNumber: 1,
      type: "REMOTE_VIDEO",
      status: "IN_PROGRESS",
      mediaMode: "VIDEO_WEBRTC",
      patientId: patient1.id,
      doctorId: doctor1User.doctorProfile.id,
      pharmacyId: pharmacy1User.pharmacy.id,
      patientVillage: "Mitro",
      bloodPressureSys: 145,
      bloodPressureDia: 92,
      bloodSugar: 155,
      temperature: 101.4,
      pulseRate: 88,
      chiefComplaints: "Bukhar, Pait Dard, Qay / Vomiting",
      totalFee: 1000,
      doctorShare: 880,
      pharmacyShare: 70,
      platformShare: 50,
      isPaidCash: true,
    },
  });

  // Sample In-Clinic Physical Token
  const apt2 = await prisma.appointment.upsert({
    where: { id: "apt-demo-002" },
    update: {},
    create: {
      id: "apt-demo-002",
      tokenNumber: 2,
      type: "IN_CLINIC_PHYSICAL",
      status: "SCHEDULED",
      mediaMode: "VIDEO_WEBRTC",
      patientId: patient2.id,
      doctorId: doctor1User.doctorProfile.id,
      pharmacyId: pharmacy1User.pharmacy.id,
      patientVillage: "Mitro",
      temperature: 102.1,
      pulseRate: 110,
      chiefComplaints: "Bache ko Shadeed Khansi aur Bukhar",
      totalFee: 1000,
      doctorShare: 880,
      pharmacyShare: 70,
      platformShare: 50,
      isPaidCash: true,
    },
  });

  console.log("✅ Seeding completed successfully!");
}

main()
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

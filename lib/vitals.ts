// Vitals evaluation and warning threshold indicators

export interface VitalStatus {
  status: "NORMAL" | "YELLOW_WARNING" | "RED_ALERT";
  message: string;
  badgeClass: string;
}

export function evaluateBloodPressure(sys?: number | null, dia?: number | null): VitalStatus {
  if (!sys || !dia) {
    return { status: "NORMAL", message: "Not recorded", badgeClass: "bg-gray-100 text-gray-700" };
  }
  if (sys >= 140 || sys < 85 || dia >= 90 || dia < 50) {
    return {
      status: "RED_ALERT",
      message: "High/Abnormal BP (High Alert)",
      badgeClass: "bg-red-100 text-red-700 border-red-300 font-bold",
    };
  }
  if (sys >= 121 || dia >= 81) {
    return {
      status: "YELLOW_WARNING",
      message: "Pre-hypertension (Elevated)",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }
  return {
    status: "NORMAL",
    message: "Normal BP",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };
}

export function evaluateBloodSugar(sugar?: number | null): VitalStatus {
  if (!sugar) {
    return { status: "NORMAL", message: "Not recorded", badgeClass: "bg-gray-100 text-gray-700" };
  }
  if (sugar >= 200 || sugar < 70) {
    return {
      status: "RED_ALERT",
      message: "Abnormal Sugar (High Alert)",
      badgeClass: "bg-red-100 text-red-700 border-red-300 font-bold",
    };
  }
  if (sugar >= 141) {
    return {
      status: "YELLOW_WARNING",
      message: "Elevated Sugar",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }
  return {
    status: "NORMAL",
    message: "Normal Sugar",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };
}

export function evaluateTemperature(temp?: number | null): VitalStatus {
  if (!temp) {
    return { status: "NORMAL", message: "Not recorded", badgeClass: "bg-gray-100 text-gray-700" };
  }
  if (temp >= 101.1) {
    return {
      status: "RED_ALERT",
      message: "High Fever (Bukhar)",
      badgeClass: "bg-red-100 text-red-700 border-red-300 font-bold",
    };
  }
  if (temp >= 99.1) {
    return {
      status: "YELLOW_WARNING",
      message: "Mild Fever",
      badgeClass: "bg-amber-100 text-amber-800 border-amber-300",
    };
  }
  return {
    status: "NORMAL",
    message: "Normal Temp",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };
}

export function evaluatePulse(pulse?: number | null): VitalStatus {
  if (!pulse) {
    return { status: "NORMAL", message: "Not recorded", badgeClass: "bg-gray-100 text-gray-700" };
  }
  if (pulse > 110 || pulse < 50) {
    return {
      status: "RED_ALERT",
      message: "Abnormal Pulse (Nabz)",
      badgeClass: "bg-red-100 text-red-700 border-red-300 font-bold",
    };
  }
  return {
    status: "NORMAL",
    message: "Normal Pulse",
    badgeClass: "bg-emerald-100 text-emerald-800 border-emerald-300",
  };
}

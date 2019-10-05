import test from "ava";
import writtenNumberCurrency from "../src";
import fr from "written-number/lib/i18n/fr";
import ar from "written-number/lib/i18n/ar";

import frDinarPreset from "../src/presets/fr-dinar";
import arDinarPreset from "../src/presets/ar-dinar";

var defaultPreset = {
  amountFormatter() {
    return "";
  },
  precisionFormatter(amount) {
    return "";
  }
};
var validConfig = {
  lang: fr,
  ...defaultPreset
};

test("requires a lang", t => {
  t.throws(() => writtenNumberCurrency({ ...validConfig, lang: null }));
});

test("requires baseAmount or a smallAmount", t => {
  const instance = writtenNumberCurrency(validConfig);

  t.throws(() =>
    instance({
      amount: null,
      precision: null
    })
  );

  t.truthy(
    instance({
      amount: 0,
      precision: null
    })
  );

  t.truthy(
    instance({
      amount: null,
      precision: 0
    })
  );
});

test("for each type of amount it requires its formatter", t => {
  var instance = writtenNumberCurrency({
    ...validConfig,
    amountFormatter: undefined
  });
  t.throws(() =>
    instance({
      amount: 12
    })
  );

  instance = writtenNumberCurrency({
    ...validConfig,
    precisionFormatter: undefined
  });
  t.throws(() =>
    instance({
      precision: 12
    })
  );
});

test("throws an error with negative value(s) frDinar -1 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  t.throws(() => instance({ amount: -1, precision: 0 }));
});

// ************************************** preset frDinar
test("preset frDinar 0 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ amount: 0, precision: 0 });
  t.is(result, "zéro dinars et zéro millimes");
});

test("preset frDinar 0 undefined", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ amount: 0 });
  t.is(result, "zéro dinars");
});

test("preset frDinar undefined 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ precision: 0 });
  t.is(result, "zéro millimes");
});

test("preset frDinar undefined 998", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ precision: 998 });
  t.is(result, "neuf cent quatre-vingt-dix-huit millimes");
});

test("preset frDinar 1339 1", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ amount: 1339, precision: 1 });
  t.is(result, "mille trois cent trente-neuf dinars et un millime");
});

test("preset frDinar 112400331 101", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ amount: 112400331, precision: 101 });
  t.is(
    result,
    "cent douze millions quatre cents mille trois cent trente et un dinars et cent un millimes"
  );
});

// ************************************** preset arDinar
test("preset arDinar 0 0", t => {
  const instance = writtenNumberCurrency({
    ...validConfig,
    ...arDinarPreset,
    lang: ar
  });
  const result = instance({ amount: 0, precision: 0 });
  t.is(result, "صفر دينار و صفر مليم");
});
test("preset arDinar 1013 2", t => {
  const instance = writtenNumberCurrency({
    ...validConfig,
    ...arDinarPreset,
    lang: ar
  });
  const result = instance({ amount: 1013, precision: 2 });
  t.is(result, "ألف وثلاثة عشر دينار و اثنان مليم");
});

test("preset arDinar 993013 107", t => {
  const instance = writtenNumberCurrency({
    ...validConfig,
    ...arDinarPreset,
    lang: ar
  });
  const result = instance({ amount: 993013, precision: 107 });
  t.is(
    result,
    "تسعمائة وثلاثة وتسعون ألف وثلاثة عشر دينار و مائة وسبعة مليمات"
  );
});

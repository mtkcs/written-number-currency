import test from "ava";
import writtenNumberCurrency from "../src";
import fr from "written-number/lib/i18n/fr";
import ar from "written-number/lib/i18n/ar";

import frDinarPreset from "../src/presets/fr-dinar";
import arDinarPreset from "../src/presets/ar-dinar";

var defaultPreset = {
  baseUnitFormatter() {
    return "";
  },
  smallUnitFormatter(amount) {
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
      baseUnitAmount: null,
      smallUnitAmount: null
    })
  );

  t.truthy(
    instance({
      baseUnitAmount: 0,
      smallUnitAmount: null
    })
  );

  t.truthy(
    instance({
      baseUnitAmount: null,
      smallUnitAmount: 0
    })
  );
});

test("for each type of amount it requires its formatter", t => {
  var instance = writtenNumberCurrency({
    ...validConfig,
    baseUnitFormatter: undefined
  });
  t.throws(() =>
    instance({
      baseUnitAmount: 12
    })
  );

  instance = writtenNumberCurrency({
    ...validConfig,
    smallUnitFormatter: undefined
  });
  t.throws(() =>
    instance({
      smallUnitAmount: 12
    })
  );
});

test("throws an error with negative value(s) frDinar -1 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  t.throws(() => instance({ baseUnitAmount: -1, smallUnitAmount: 0 }));
});

// ************************************** preset frDinar
test("preset frDinar 0 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ baseUnitAmount: 0, smallUnitAmount: 0 });
  t.is(result, "zéro dinars et zéro millimes");
});

test("preset frDinar 0 undefined", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ baseUnitAmount: 0 });
  t.is(result, "zéro dinars");
});

test("preset frDinar undefined 0", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ smallUnitAmount: 0 });
  t.is(result, "zéro millimes");
});

test("preset frDinar undefined 998", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ smallUnitAmount: 998 });
  t.is(result, "neuf cent quatre-vingt-dix-huit millimes");
});

test("preset frDinar 1339 1", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ baseUnitAmount: 1339, smallUnitAmount: 1 });
  t.is(result, "mille trois cent trente-neuf dinars et un millime");
});

test("preset frDinar 112400331 101", t => {
  const instance = writtenNumberCurrency({ ...validConfig, ...frDinarPreset });
  const result = instance({ baseUnitAmount: 112400331, smallUnitAmount: 101 });
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
  const result = instance({ baseUnitAmount: 0, smallUnitAmount: 0 });
  t.is(result, "صفر دينار و صفر مليم");
});
test("preset arDinar 1013 2", t => {
  const instance = writtenNumberCurrency({
    ...validConfig,
    ...arDinarPreset,
    lang: ar
  });
  const result = instance({ baseUnitAmount: 1013, smallUnitAmount: 2 });
  t.is(result, "ألف وثلاثة عشر دينار و اثنان مليم");
});

test("preset arDinar 993013 107", t => {
  const instance = writtenNumberCurrency({
    ...validConfig,
    ...arDinarPreset,
    lang: ar
  });
  const result = instance({ baseUnitAmount: 993013, smallUnitAmount: 107 });
  t.is(
    result,
    "تسعمائة وثلاثة وتسعون ألف وثلاثة عشر دينار و مائة وسبعة مليمات"
  );
});

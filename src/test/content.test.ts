import { describe, expect, it } from 'vitest';
import { ALL_PRODUCTS, getProductById } from '../content/catalogue';
import { COTTON_PRODUCT } from '../content/cottonGarment';
import { BISCUIT_PRODUCT } from '../content/packagedBiscuit';

describe('Data Architecture & Content Models', () => {
  it('registers both required products in the catalogue', () => {
    expect(ALL_PRODUCTS.length).toBe(2);
    expect(getProductById('cotton-garment')).toBeDefined();
    expect(getProductById('packaged-biscuit')).toBeDefined();
  });

  describe('Cotton Garment (8 Stages)', () => {
    it('has exactly 8 stages with the required sequence', () => {
      expect(COTTON_PRODUCT.stagesTotal).toBe(8);
      expect(COTTON_PRODUCT.stages.length).toBe(8);

      const expectedKeyTokens = [
        'Cultivation',
        'Fibre',
        'Spinning',
        'Fabric',
        'Finishing',
        'Cutting',
        'Stitching',
        'Finished',
      ];

      COTTON_PRODUCT.stages.forEach((stage, idx) => {
        expect(stage.number).toBe(idx + 1);
        expect(stage.title).toContain(expectedKeyTokens[idx]);
      });
    });

    it('ensures every cotton stage has complete required pedagogical attributes', () => {
      COTTON_PRODUCT.stages.forEach((stage) => {
        expect(stage.id).toBeTruthy();
        expect(stage.title).toBeTruthy();
        expect(stage.description).toBeTruthy();
        expect(stage.transformation).toBeTruthy();

        // Inputs & Outputs
        expect(stage.inputs).toBeTruthy();
        expect(stage.outputs).toBeTruthy();

        // Media
        expect(stage.image.url).toBeTruthy();
        expect(stage.image.caption).toBeTruthy();

        // Worker (SDG 8)
        expect(stage.worker.role).toBeTruthy();
        expect(stage.worker.tasks).toBeTruthy();
        expect(stage.worker.skills).toBeTruthy();

        // Machinery (SDG 9)
        expect(stage.technology.machinery).toBeTruthy();
        expect(stage.technology.process).toBeTruthy();
        expect(stage.technology.metric).toBeTruthy();

        // Sources and Glossary references
        expect(stage.sources.length).toBeGreaterThan(0);
        expect(stage.glossary.length).toBeGreaterThan(0);
      });
    });

    it('contains verified FabricDecoder tag data', () => {
      expect(COTTON_PRODUCT.fabricDecoder).toBeDefined();
      const decoder = COTTON_PRODUCT.fabricDecoder!;
      expect(decoder.verifiedComposition.value?.[0].name).toContain('Cotton');
      expect(decoder.construction.value).toContain('Jersey');
      expect(decoder.careSymbols.value?.length).toBeGreaterThanOrEqual(4);
      expect(decoder.gsm.value).toBe(180);
    });
  });

  describe('Packaged Biscuit (7 Stages)', () => {
    it('has exactly 7 stages with the required sequence', () => {
      expect(BISCUIT_PRODUCT.stagesTotal).toBe(7);
      expect(BISCUIT_PRODUCT.stages.length).toBe(7);

      const expectedKeyTokens = [
        'Cultivation',
        'Milling',
        'Mixing',
        'Shaping',
        'Baking',
        'Packaging',
        'Finished',
      ];

      BISCUIT_PRODUCT.stages.forEach((stage, idx) => {
        expect(stage.number).toBe(idx + 1);
        expect(stage.title).toContain(expectedKeyTokens[idx]);
      });
    });

    it('ensures every biscuit stage has complete required pedagogical attributes', () => {
      BISCUIT_PRODUCT.stages.forEach((stage) => {
        expect(stage.id).toBeTruthy();
        expect(stage.title).toBeTruthy();
        expect(stage.description).toBeTruthy();
        expect(stage.transformation).toBeTruthy();

        // Inputs & Outputs
        expect(stage.inputs).toBeTruthy();
        expect(stage.outputs).toBeTruthy();

        // Media
        expect(stage.image.url).toBeTruthy();
        expect(stage.image.caption).toBeTruthy();

        // Worker & Tech
        expect(stage.worker.role).toBeTruthy();
        expect(stage.technology.machinery).toBeTruthy();

        // Sources & Glossary
        expect(stage.sources.length).toBeGreaterThan(0);
        expect(stage.glossary.length).toBeGreaterThan(0);
      });
    });

    it('contains verified FoodDecoder label data', () => {
      expect(BISCUIT_PRODUCT.foodDecoder).toBeDefined();
      const decoder = BISCUIT_PRODUCT.foodDecoder!;
      expect(decoder.ingredients.value?.length).toBeGreaterThanOrEqual(4);
      expect(decoder.nutrients.length).toBeGreaterThanOrEqual(4);
      expect(decoder.allergens.value?.length).toBeGreaterThan(0);
      expect(decoder.additives.length).toBeGreaterThan(0);
    });
  });
});


import React, { useState } from 'react';
import { FileText, DollarSign, CheckCircle, PlusCircle } from 'lucide-react';

const PostJobPage: React.FC = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send this data to a server
    console.log('Job Posted:', formData);
    setSubmitted(true);
  };
  
  const handleReset = () => {
      setFormData({ title: '', description: '', price: '' });
      setSubmitted(false);
  }

  if (submitted) {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
            <h1 className="mt-4 text-3xl font-bold text-tertiary">Poptávka byla odeslána!</h1>
            <p className="mt-2 text-tertiary/90">Vaše poptávka byla úspěšně zveřejněna. Brzy se vám začnou ozývat první interpreti.</p>
            <div className="mt-6">
                <button
                    onClick={handleReset}
                    className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-secondary"
                >
                    <PlusCircle className="mr-2 -ml-1 h-5 w-5" />
                    Zadat další poptávku
                </button>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-3xl font-bold text-tertiary mb-2">Zadat novou poptávku</h1>
        <p className="text-tertiary/90 mb-6">Popište svůj projekt a oslovte talentované interprety na naší platformě.</p>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="job-title" className="block text-sm font-medium text-tertiary">
              Název projektu
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="title"
                id="job-title"
                value={formData.title}
                onChange={handleChange}
                required
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md bg-white text-tertiary placeholder-tertiary/60"
                placeholder="např. 'Voiceover pro reklamní spot'"
              />
            </div>
          </div>

          <div>
            <label htmlFor="description" className="block text-sm font-medium text-tertiary">
              Popis a požadavky
            </label>
            <div className="mt-1">
              <textarea
                id="description"
                name="description"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                className="shadow-sm focus:ring-primary focus:border-primary block w-full sm:text-sm border-gray-300 rounded-md bg-white text-tertiary placeholder-tertiary/60"
                placeholder="Detailně popište, jaký hlas hledáte, tonalitu, rychlost a další specifika."
              ></textarea>
            </div>
          </div>

          <div>
             <label htmlFor="script" className="block text-sm font-medium text-tertiary mb-1">
              Scénář
            </label>
            <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
              <div className="space-y-1 text-center">
                <FileText className="mx-auto h-12 w-12 text-tertiary/50" />
                <div className="flex text-sm text-tertiary/90">
                  <label
                    htmlFor="file-upload"
                    className="relative cursor-pointer bg-white rounded-md font-medium text-primary hover:text-secondary focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary"
                  >
                    <span>Nahrajte soubor</span>
                    <input id="file-upload" name="file-upload" type="file" className="sr-only" />
                  </label>
                  <p className="pl-1">nebo ho přetáhněte sem</p>
                </div>
                <p className="text-xs text-tertiary/70">PDF, DOCX, TXT do 10MB</p>
              </div>
            </div>
          </div>

          <div>
            <label htmlFor="price" className="block text-sm font-medium text-tertiary">
              Rozpočet (CZK)
            </label>
            <div className="mt-1 relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <DollarSign className="h-5 w-5 text-tertiary/50" />
              </div>
              <input
                type="number"
                name="price"
                id="price"
                value={formData.price}
                onChange={handleChange}
                required
                className="focus:ring-primary focus:border-primary block w-full pl-10 sm:text-sm border-gray-300 rounded-md bg-white text-tertiary placeholder-tertiary/60"
                placeholder="5000"
              />
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end">
              <button
                type="button"
                className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-tertiary hover:bg-accent focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Zrušit
              </button>
              <button
                type="submit"
                className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-primary hover:bg-secondary focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
              >
                Zveřejnit poptávku
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJobPage;
